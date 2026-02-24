import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setClockSize } from '../features/timeZone/timeZoneSlice';

const sizes = ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];

const SizeToggler = () => {
    const dispatch = useAppDispatch();
    const currentSize = useAppSelector((state) => state.timeZone.clockSize);

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                Size: {currentSize.toUpperCase()}
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048">
                    <path d="M225.922 560.697L1024 1358.75l998.078-798.053L2048 706.75l-1024 819.25L0 706.75l225.922-146.053z"></path>
                </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-24 max-h-96 overflow-y-auto">
                {sizes.map((s) => (
                    <li key={s}>
                        <button
                            className={`${currentSize === s ? 'active' : ''}`}
                            onClick={() => dispatch(setClockSize(s))}
                        >
                            {s.toUpperCase()}

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={`h-3 w-3 shrink-0 ${currentSize === s ? 'visible' : 'invisible'}`}><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path></svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SizeToggler;
