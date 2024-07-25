import { useEffect, useCallback } from 'react';

const useInfiniteScroll = (loadMore) => {
    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            loadMore();
        }
    }, [loadMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
};

export default useInfiniteScroll;