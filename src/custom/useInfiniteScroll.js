import { useEffect, useCallback } from 'react';

const useInfiniteScroll = (loadMore, threshold = 1) => {
    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop + threshold >=
            document.documentElement.scrollHeight
        ) {
            loadMore();
        }
    }, [loadMore, threshold]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
};

export default useInfiniteScroll;