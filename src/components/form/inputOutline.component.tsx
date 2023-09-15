import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { LogBox, StyleSheet, Text, TextInput, TextInputProps, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface InputOutlineMethods {
  /**
   * Requests focus for the given input or view. The exact behavior triggered will depend on the platform and type of view.
   */
  focus: () => void;
  /**
   * Removes focus from an input or view. This is the opposite of focus()
   */
  blur: () => void;
  /**
   * Returns current focus of input.
   */
  isFocused: boolean;
  /**
   * Removes all text from the TextInput.
   */
  clear: () => void;
}

export interface InputOutlineProps extends TextInputProps {
  /**
   * Placeholder for the textInput.
   * @default Placeholder
   * @type string
   */
  placeholder?: string;
  /**
   * Define if field is required
   * @default false
   * @type boolean
   */
  isRequired?: boolean;
  /**
   * Font size for TextInput.
   * @default 14
   * @type number
   */
  fontSize?: number;
  /**
   * Font weight for TextInput.
   * @default '800'
   * @type "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined
   */
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
  /**
   * Color of TextInput font.
   * @default 'black'
   * @type string
   */
  fontColor?: string;
  /**
   * Font family for all fonts.
   * @default undefined
   * @type string
   */
  fontFamily?: string;
  /**
   * Font size for label of TextInput.
   * @default 16
   * @type number
   */
  labelFontSize?: number;
  /**
   * Vertical padding for TextInput Container. Used to calculate animations.
   * @default 12
   * @type number
   */
  paddingVertical?: number;
  /**
   * Horizontal padding for TextInput Container.
   * @default 16
   * @type number
   */
  paddingHorizontal?: number;
  /**
   * Color when focused.
   * @default 'blue'
   * @type string
   */
  activeColor?: string;
  /**
   * Color when blurred (not focused).
   * @default 'grey'
   * @type string
   */
  inactiveColor?: string;
  /**
   * Background color of the InputOutline.
   * @default 'white'
   * @type string
   */
  backgroundColor?: string;
  /**
   * Error message is displayed. If anything is provided to error besides null or undefined, then the component is
   * within an error state, thus displaying the error message provided here and errorColor.
   * @default undefined
   * @type string
   */
  error?: string;
  /**
   * Color that is displayed when in error state. Error state is anything that is not null or undefined.
   * @default 'red'
   * @type string
   */
  errorColor?: string;
  /**
   * Trailing Icon for the TextInput.
   * @default undefined
   * @type React.FC
   */
  trailingIcon?: React.FC;
  /**
   * Border radius applied to container.
   * @default 5
   * @type number
   */
  roundness?: number;
  /**
   * Will show a character count helper text and limit the characters being entered.
   * @default undefined
   * @type number
   */
  characterCount?: number;
  characterCountFontSize?: number;
  characterCountFontFamily?: string;
  characterCountColor?: string;
  /**
   * Helper text that can be displayed to assist users with Inputs. `error` prop will override this.
   * @default undefined
   * @type string
   */
  assistiveText?: string;
  /**
   * Font size of assistive text.
   * @default 10
   * @type number
   */
  assistiveTextFontSize?: number;
  /**
   * Color of assistive text.
   * @default inactiveColor
   * @type string
   */
  assistiveTextColor?: string;
  /**
   * Font family of assistive text.
   * @default undefined
   * @type string
   */
  assistiveFontFamily?: string;
  /**
   * Font size of error text.
   * @default 10
   * @type number
   */
  errorFontSize?: number;
  /**
   * Font family of error text.
   * @default undefined
   * @type string
   */
  errorFontFamily?: string;
}

export type InputOutline = InputOutlineMethods;

const InputOutlineComponent = forwardRef<InputOutline, InputOutlineProps>((props, ref) => {
  // establish provided props
  const {
    // theme colors
    inactiveColor = 'grey',
    activeColor = 'blue',
    errorColor = 'red',
    backgroundColor = 'white',

    // fonts
    fontSize = 14,
    fontWeight = '800',
    fontColor = 'black',
    fontFamily,
    labelFontSize = 16,

    error,
    errorFontSize = 10,
    errorFontFamily,

    assistiveText,
    assistiveTextFontSize = 10,
    assistiveTextColor = inactiveColor,
    assistiveFontFamily,

    characterCount,
    characterCountFontFamily,
    characterCountColor = inactiveColor,
    characterCountFontSize = 10,

    // styling
    paddingHorizontal = 16,
    paddingVertical = 12,
    roundness = 5,
    style,

    // features
    placeholder = 'Placeholder',
    isRequired = false,
    trailingIcon,

    // others
    value: _providedValue = '',
    onChangeText,
    ...inputProps
  } = props;
  // value of input
  const [value, setValue] = useState(_providedValue);

  // animation vars
  const inputRef = useRef<TextInput>(null);
  const placeholderMap = useSharedValue(_providedValue ? 1 : 0);
  const placeholderSize = useSharedValue(0);
  const colorMap = useSharedValue(0);

  // helper functions
  const focus = () => inputRef.current?.focus();
  const blur = () => inputRef.current?.blur();
  const isFocused = () => Boolean(inputRef.current?.isFocused());
  const clear = () => {
    Boolean(inputRef.current?.clear());
    setValue('');
  };

  const errorState = useCallback(() => error !== null && error !== undefined, [error]);

  const handleFocus = () => {
    placeholderMap.value = withTiming(1); // focused
    if (!errorState()) colorMap.value = withTiming(1); // active
    focus();
  };

  const handleBlur = () => {
    if (!value) placeholderMap.value = withTiming(0); // blur
    if (!errorState()) colorMap.value = withTiming(0); // inactive
    blur();
  };

  const handleChangeText = (text: string) => {
    onChangeText?.(text);
    setValue(text);
  };

  const handlePlaceholderLayout = useCallback(
    // @ts-ignore
    ({ nativeEvent }) => {
      const { width } = nativeEvent.layout;
      placeholderSize.value = width;
    },
    [placeholderSize],
  );

  const renderTrailingIcon = useCallback(() => {
    if (trailingIcon) return trailingIcon({});
    return null;
  }, [trailingIcon]);

  // handle value update
  useEffect(() => {
    if (_providedValue.length) placeholderMap.value = withTiming(1); // focused;
    setValue(_providedValue);
  }, [_providedValue, placeholderMap]);
  // error handling
  useEffect(() => {
    if (errorState()) {
      colorMap.value = 2; // error -- no animation here, snap to color immediately
    } else {
      colorMap.value = isFocused() ? 1 : 0; // to active or inactive color if focused
    }
  }, [error, colorMap, errorState, isFocused]);

  const animatedPlaceholderStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(placeholderMap.value, [0, 1], [0, -(paddingVertical + labelFontSize * 0.7)]),
      },
      {
        scale: interpolate(placeholderMap.value, [0, 1], [1, 0.7]),
      },
      {
        translateX: interpolate(placeholderMap.value, [0, 1], [0, -placeholderSize.value * 0.2]),
      },
    ],
  }));

  const animatedPlaceholderTextStyles = useAnimatedStyle(() => ({
    color: interpolateColor(colorMap.value, [0, 1, 2], [inactiveColor, activeColor, errorColor]),
  }));

  const animatedPlaceholderSpacerStyles = useAnimatedStyle(() => ({
    width: interpolate(placeholderMap.value, [0, 1], [0, placeholderSize.value * 0.7 + 7], Extrapolate.CLAMP),
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderColor:
      placeholderSize.value > 0
        ? interpolateColor(colorMap.value, [0, 1, 2], [inactiveColor, activeColor, errorColor])
        : inactiveColor,
  }));

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useImperativeHandle(ref, () => ({
    focus: handleFocus,
    blur: handleBlur,
    isFocused: isFocused(),
    clear: clear,
  }));

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: roundness,
      alignSelf: 'stretch',
      flexDirection: 'row',
      backgroundColor,
      marginBottom: 8,
      marginTop: 8,
    },
    inputContainer: {
      flex: 1,
      paddingHorizontal,
      paddingVertical,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      fontSize,
      fontWeight,
      fontFamily,
      color: fontColor,
    },
    placeholder: {
      position: 'absolute',
      top: paddingVertical,
      left: paddingHorizontal,
    },
    placeholderText: {
      fontSize: labelFontSize,
      fontWeight,
      fontFamily,
    },
    placeholderSpacer: {
      position: 'absolute',
      top: -1,
      left: paddingHorizontal - 3,
      backgroundColor,
      height: 1,
    },
    errorText: {
      position: 'absolute',
      color: errorColor,
      fontSize: errorFontSize,
      fontFamily: errorFontFamily,
      bottom: -errorFontSize - 7,
      left: 0,
    },
    trailingIcon: {
      position: 'absolute',
      right: paddingHorizontal,
      alignSelf: 'center',
    },
    counterText: {
      position: 'absolute',
      color: errorState() ? errorColor : characterCountColor,
      fontSize: characterCountFontSize,
      bottom: -characterCountFontSize - 7,
      right: 0,
      fontFamily: characterCountFontFamily,
    },
    assistiveText: {
      position: 'absolute',
      color: assistiveTextColor,
      fontSize: assistiveTextFontSize,
      bottom: -assistiveTextFontSize - 7,
      left: 0,
      fontFamily: assistiveFontFamily,
    },
  });

  const placeholderStyle = useMemo(() => {
    return [styles.placeholder, animatedPlaceholderStyles];
  }, [styles.placeholder, animatedPlaceholderStyles]);

  return (
    <Animated.View style={[styles.container, animatedContainerStyle, style]}>
      <TouchableWithoutFeedback onPress={handleFocus}>
        <View style={styles.inputContainer}>
          <TextInput
            {...inputProps}
            ref={inputRef}
            style={styles.input}
            pointerEvents={isFocused() ? 'auto' : 'none'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            maxLength={characterCount ? characterCount : undefined}
            selectionColor={errorState() ? errorColor : activeColor}
            placeholder=''
            value={value}
            textAlignVertical='top'
          />
        </View>
      </TouchableWithoutFeedback>
      {trailingIcon && <View style={styles.trailingIcon}>{renderTrailingIcon()}</View>}
      <Animated.View style={[styles.placeholderSpacer, animatedPlaceholderSpacerStyles]} />
      <Animated.View style={placeholderStyle} onLayout={handlePlaceholderLayout} pointerEvents='none'>
        <Animated.Text style={[styles.placeholderText, animatedPlaceholderTextStyles]}>
          {`${placeholder}${isRequired ? ' *' : ''}`}
        </Animated.Text>
      </Animated.View>
      {characterCount && <Text style={styles.counterText}>{`${value.length} / ${characterCount}`}</Text>}
      {errorState() ? (
        <Text style={[styles.errorText]}>{error}</Text>
      ) : (
        assistiveText && <Text style={[styles.assistiveText]}>{assistiveText}</Text>
      )}
    </Animated.View>
  );
});

const InputOutline = InputOutlineComponent;
export { InputOutline };

// color issue
LogBox.ignoreLogs(['You are setting the style `{ color: ... }` as a prop.']);
