import React from 'react';
import { useCustomFlatListHook } from './hooks/useCustomFlatListHook';
import { Animated, FlatListProps, View } from 'react-native';

type CustomFlatListProps<T> = Omit<FlatListProps<T>, 'ListHeaderComponent'> & {
  /**
   * An element that is above all
   *
   * Hides when scrolling
   */
  HeaderComponent: JSX.Element;
  /**
   * An element that is higher than the list but lower than {@link Props.HeaderComponent HeaderComponent}
   *
   * Hides when scrolling
   */
  TopListElementComponent: JSX.Element;
};

/**
 * Custom FlatList with animated Header and TopListElement
 */
function CustomFlatList<T>({
  style,
  ...props
}: CustomFlatListProps<T>): React.ReactElement {
  const [scrollY, styles, onLayoutHeaderElement, onLayoutTopListElement] =
    useCustomFlatListHook();

  return (
    <View style={style}>
      <Animated.View // <-- Top of List Component
        style={styles.topElement}
        onLayout={onLayoutTopListElement}>
        {props.TopListElementComponent}
      </Animated.View>

      <Animated.FlatList<any>
        {...props}
        ListHeaderComponent={
          // <-- Header Component
          <Animated.View onLayout={onLayoutHeaderElement}>
            {props.HeaderComponent}
          </Animated.View>
        }
        ListHeaderComponentStyle={[props.ListHeaderComponentStyle, styles.header]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
      />
    </View>
  );
}

export default CustomFlatList;
