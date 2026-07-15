import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { renderWithProviders, screen } from '~src/test/render.utils';
import BottomSheetWrapper from './bottomSheetWrapper.component';

describe('BottomSheetWrapper', () => {
  it('mounts without crashing inside the required gesture/bottom-sheet providers', async () => {
    await renderWithProviders(
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <BottomSheetWrapper>
            <Text>Sheet content</Text>
          </BottomSheetWrapper>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>,
    );

    // The sheet is closed until `.present()` is called imperatively via ref, so its content isn't
    // mounted yet — this only asserts the wrapper renders without crashing in its provider tree.
    expect(screen.queryByText('Sheet content')).toBeNull();
  });
});
