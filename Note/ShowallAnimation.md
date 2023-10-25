
      const showAllHeight = useSharedValue(400); // Chiều cao ban đầu của Animated.View
    // const showAllOpacity = useSharedValue(1); // Độ mờ ban đầu
    
    useEffect(() => {
        showAllHeight.value = withTiming(200, { duration: 0 });
        // showAllOpacity.value = withTiming(0, { duration: 0 });
    }, []);

    const toggleShowAll = () => {
        if (showAllHeight.value === 200) {
            // Nếu đã ẩn, thì hiển thị lại
            showAllHeight.value = withSpring(400, { damping: 2, stiffness: 60 });
            // showAllOpacity.value = withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) });
        } else {
            // Nếu đã hiển thị, thì ẩn đi
            showAllHeight.value = withTiming(200);
            // showAllOpacity.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) });
        }
    };

    const showAllStyle = useAnimatedStyle(() => {
        return {
            height: showAllHeight.value,
            // opacity: showAllOpacity.value,
        };
    });