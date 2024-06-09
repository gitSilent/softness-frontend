import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ImageSkeleton() {
    return (
        <SkeletonTheme baseColor="#DDDDDD" highlightColor="#FAFAFA">
            <Skeleton height={'100%'} />
        </SkeletonTheme>
    )
}
