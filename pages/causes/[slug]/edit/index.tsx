import React, { useEffect, useState } from "react";
import CreateCause from "pages/causes/create";
import { useRouter } from "next/router";
import getSingle from "redux/actions/cause/getSingle";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import moment from "moment";
import { isEmpty, forEach } from "lodash";
import Spinner from "components/Spinner";
import phoneFormatter from "helpers/phoneNumberFormatter";
import { IUnknownObject } from "interfaces/unknownObject";
import Error from "components/common/Error";
import notification from "utils/notification";

export interface EditCauseProps {}

const EditCause: React.FC<EditCauseProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  const { slug } = router.query;

  const { data, loading, error } = useSelector(
    ({ cause: { single } }: IRootState) => single
  );

  const { data: currentUser } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser
  );

  useEffect(() => {
    if (
      !isEmpty(data) &&
      !isEmpty(currentUser) &&
      data.user_id !== currentUser.id
    ) {
      notification("You dont have the permission to edit this cause", "warn");
      router.push("/user/causes");
    }
  }, [data]);

  if (slug && !fetched) {
    getSingle(slug)(dispatch);
    setFetched(true);
  }

  const formatData = () => {
    if (!isEmpty(data)) {
      const formattedData: IUnknownObject = {
        ...data,
        duration: [moment(data.start_date), moment(data.end_date)],
        image: data.image && [
          {
            uid: "-1",
            status: "done",
            url: data.image,
            thumbUrl: data.image,
          },
        ],
        affiliated: !!data.organization,
      };
      forEach(formattedData, (value, key) => {
        if (key === "institution" && value) {
          forEach(value, (institutionValue, institutionKey) => {
            if (institutionKey.includes("phone"))
              return (formattedData[
                `${key}_${institutionKey}`
              ] = phoneFormatter(institutionValue));
            formattedData[`${key}_${institutionKey}`] = institutionValue;
          });
          return;
        }
        if (key === "organization" && value) {
          forEach(value, (organizationValue, organizationKey) => {
            if (organizationKey.includes("phone"))
              return (formattedData[
                `${key}_${organizationKey}`
              ] = phoneFormatter(organizationValue));
            formattedData[`${key}_${organizationKey}`] = organizationValue;
          });
          return;
        }
        if (key.includes("phone")) {
          formattedData[key] = phoneFormatter(value);
          return;
        }
      });
      return formattedData;
    }
    return {};
  };

  const formattedData = formatData();

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error status={error.status || 500} message={error.message} />
      ) : (
        <CreateCause editFormState={formattedData} slug={slug} />
      )}
    </div>
  );
};

export default EditCause;
