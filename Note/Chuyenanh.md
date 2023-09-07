    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        require('../Image/Boost.png'),  // Đường dẫn tới các hình ảnh của bạn
        require('../Image/Dfix.png'),
        // Thêm các đường dẫn đến hình ảnh khác ở đây
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            // Chuyển sang hình ảnh tiếp theo
            setCurrentImageIndex((prevIndex:any) =>
                (prevIndex + 1) % images.length
            );
        }, 1000); // Thời gian chuyển đổi (1 giây)

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <View>
            <Image source={images[currentImageIndex]} style={{ width: 200, height: 200 }} />
        </View>
    );
};