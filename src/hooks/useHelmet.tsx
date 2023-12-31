import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "reduxStore";
import { HelmetProps, set } from "reduxStore/app/helmet";

function useHelmet(props: HelmetProps) {
  const dispatch = useDispatch();
  const helmetProps = useAppSelector((state) => state.app.helmet);

  const setHelmetProps = useCallback(
    (attr: HelmetProps) => {
      dispatch(set(attr));
    },
    [dispatch],
  );

  useEffect(() => {
    setHelmetProps(props);
  }, [dispatch, props, setHelmetProps]);

  return [helmetProps, setHelmetProps];
}

export default useHelmet;
