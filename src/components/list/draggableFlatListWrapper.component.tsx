import { Fragment, useCallback, useRef, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import type { ComposedGesture } from 'react-native-gesture-handler';
import { Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import EmptyComponent from '../empty/empty.component';
import { computeDropIndex, moveItem, type RowLayout } from './draggableFlatListWrapper.utils';

// Reasonable "press and hold before it starts following your finger" delay/tolerance for the
// drag handle — see FOLDERS_FEATURE.md Phase 6 for why this replaced react-native-draggable-
// flatlist (its per-row native measureLayout calls made folderDetail.page.tsx slow to render).
const LONG_PRESS_MIN_DURATION_MS = 350;
const LONG_PRESS_MAX_DISTANCE_PX = 1000;

export type DraggableRowRenderItemParams<T> = {
  drag: ComposedGesture;
  index: number;
  isActive: boolean;
  item: T;
};

type DraggableFlatListWrapperProps<T> = {
  data: T[];
  ItemSeparatorComponent?: React.ComponentType;
  keyExtractor: (item: T, index: number) => string;
  ListEmptyComponent?: React.ComponentType;
  ListFooterComponent?: React.ComponentType;
  ListHeaderComponent?: React.ReactElement | null;
  onDragEnd: (params: { data: T[] }) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  renderItem: (params: DraggableRowRenderItemParams<T>) => React.ReactNode;
};

type DraggableRowProps<T> = {
  index: number;
  isActive: boolean;
  item: T;
  onLayout: (rowKey: string, layout: RowLayout) => void;
  onRowDragEnd: (rowKey: string, translationY: number) => void;
  onRowDragStart: (rowKey: string) => void;
  renderItem: (params: DraggableRowRenderItemParams<T>) => React.ReactNode;
  rowKey: string;
};

// One row's own drag handling. `isActive` (plain React state, one render-cycle behind the UI-
// thread gesture) drives the styling `renderItem` applies (e.g. dimming the card); `isDragging`
// (a shared value) is what the gesture worklets themselves gate on, since they need an answer
// immediately, without waiting on a JS round trip.
const DraggableRow = <T,>({
  index,
  isActive,
  item,
  onLayout,
  onRowDragEnd,
  onRowDragStart,
  renderItem,
  rowKey,
}: DraggableRowProps<T>) => {
  const rawTranslationY = useSharedValue(0);
  const dragStartTranslationY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const handleDragStart = useCallback(() => onRowDragStart(rowKey), [onRowDragStart, rowKey]);
  const handleDragEnd = useCallback(
    (translationY: number) => onRowDragEnd(rowKey, translationY),
    [onRowDragEnd, rowKey],
  );

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      rawTranslationY.value = event.translationY;
    })
    .onEnd((event) => {
      if (isDragging.value) {
        scheduleOnRN(handleDragEnd, event.translationY - dragStartTranslationY.value);
      }
    })
    .onFinalize(() => {
      isDragging.value = false;
      rawTranslationY.value = 0;
      dragStartTranslationY.value = 0;
    });

  const longPress = Gesture.LongPress()
    .minDuration(LONG_PRESS_MIN_DURATION_MS)
    .maxDistance(LONG_PRESS_MAX_DISTANCE_PX)
    .onStart(() => {
      dragStartTranslationY.value = rawTranslationY.value;
      isDragging.value = true;
      scheduleOnRN(handleDragStart);
    })
    .simultaneousWithExternalGesture(pan);

  const drag = Gesture.Simultaneous(longPress, pan);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: isDragging.value ? rawTranslationY.value - dragStartTranslationY.value : 0 }],
    zIndex: isDragging.value ? 10 : 0,
  }));

  return (
    <Animated.View
      onLayout={(event) => onLayout(rowKey, { height: event.nativeEvent.layout.height, y: event.nativeEvent.layout.y })}
      style={animatedStyle}>
      {renderItem({ drag, index, isActive, item })}
    </Animated.View>
  );
};

// Hand-rolled replacement for react-native-draggable-flatlist (see FOLDERS_FEATURE.md Phase 6):
// a plain, non-virtualized ScrollView over `data`, each row wrapped in `DraggableRow`. Dragging
// only moves the dragged row itself (no live "make room" shifting of its siblings) — the target
// slot is computed once at drag-end from each row's static `onLayout` position plus the finger's
// accumulated translation (`computeDropIndex`), then `data` is reordered and handed to
// `onDragEnd`. Scrolling is disabled for the duration of a drag so a row's static layout stays a
// reliable stand-in for its position — this list is small (~10-20 items, single user, personal
// collection) so that's an acceptable trade rather than also tracking scroll offset.
const DraggableFlatListWrapper = <T,>({
  data,
  ItemSeparatorComponent,
  keyExtractor,
  ListEmptyComponent = EmptyComponent,
  ListFooterComponent,
  ListHeaderComponent,
  onDragEnd,
  onRefresh,
  refreshing,
  renderItem,
}: DraggableFlatListWrapperProps<T>) => {
  const [activeKey, setActiveKey] = useState<string>();
  const rowLayouts = useRef(new Map<string, RowLayout>());

  const handleRowLayout = useCallback((rowKey: string, layout: RowLayout) => {
    rowLayouts.current.set(rowKey, layout);
  }, []);

  const handleRowDragEnd = useCallback(
    (rowKey: string, translationY: number) => {
      setActiveKey(undefined);

      const draggedIndex = data.findIndex((item, index) => keyExtractor(item, index) === rowKey);
      if (draggedIndex === -1) return;

      const layouts = data.map((item, index) => rowLayouts.current.get(keyExtractor(item, index)));
      const targetIndex = computeDropIndex(draggedIndex, translationY, layouts);

      if (targetIndex === draggedIndex) return;

      onDragEnd({ data: moveItem(data, draggedIndex, targetIndex) });
    },
    [data, keyExtractor, onDragEnd],
  );

  const refreshControl = onRefresh ? (
    <RefreshControl onRefresh={onRefresh} refreshing={refreshing ?? false} />
  ) : undefined;

  if (data.length === 0) {
    return (
      <ScrollView refreshControl={refreshControl}>
        {ListHeaderComponent}
        <ListEmptyComponent />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      refreshControl={refreshControl}
      scrollEnabled={activeKey === undefined}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {ListHeaderComponent}

      {data.map((item, index) => {
        const rowKey = keyExtractor(item, index);

        return (
          <Fragment key={rowKey}>
            <DraggableRow
              index={index}
              isActive={activeKey === rowKey}
              item={item}
              onLayout={handleRowLayout}
              onRowDragEnd={handleRowDragEnd}
              onRowDragStart={setActiveKey}
              renderItem={renderItem}
              rowKey={rowKey}
            />
            {index < data.length - 1 ? (
              ItemSeparatorComponent ? (
                <ItemSeparatorComponent />
              ) : (
                <View className='h-4' />
              )
            ) : null}
          </Fragment>
        );
      })}

      {ListFooterComponent ? <ListFooterComponent /> : <View className='h-20' />}
    </ScrollView>
  );
};

export default DraggableFlatListWrapper;
