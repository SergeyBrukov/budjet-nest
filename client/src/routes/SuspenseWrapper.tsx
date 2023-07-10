import {lazy, Suspense} from "react";
import Spinner from "../components/spinner/Spinner.tsx";

interface ISuspenseWrapper {
    path: string
}

const SuspenseWrapper = ({path}: ISuspenseWrapper) => {
    const LazyComponent = lazy(() => import(`../pages/${path}.tsx`));

    return (
        <Suspense fallback={<Spinner />}>
            <LazyComponent />
        </Suspense>
    )


}

export default SuspenseWrapper