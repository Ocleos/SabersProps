import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { renderWithProviders, screen } from '~src/test/render.utils';
import DraggableFlatListWrapper from './draggableFlatListWrapper.component';

// Unlike react-native-draggable-flatlist (see FOLDERS_FEATURE.md Phase 3/6), this hand-rolled
// implementation mounts fine under Jest — it only uses useSharedValue/useAnimatedStyle plus
// Gesture Handler's Pan/LongPress, none of which hit the useAnimatedScrollHandler/
// useAnimatedReaction worklet-mocking gap documented elsewhere in this codebase. Still, RNTL's
// `fireEvent` can't drive a real gesture-handler touch sequence, so the drag interaction itself
// stays a manual-verification gap; the index math it depends on is covered directly by
// `draggableFlatListWrapper.utils.test.ts`.
const renderList = (data: string[]) =>
  renderWithProviders(
    <GestureHandlerRootView>
      <DraggableFlatListWrapper
        data={data}
        keyExtractor={(item) => item}
        onDragEnd={jest.fn()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </GestureHandlerRootView>,
  );

describe('DraggableFlatListWrapper', () => {
  it('renders each item using the given renderItem', async () => {
    await renderList(['Graflex', 'Anakin']);

    expect(screen.getByText('Graflex')).toBeTruthy();
    expect(screen.getByText('Anakin')).toBeTruthy();
  });

  it('renders the empty state when there is no data', async () => {
    await renderList([]);

    expect(screen.getByText('Aucune donnée')).toBeTruthy();
  });
});
