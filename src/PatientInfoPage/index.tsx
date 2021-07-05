import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import Axios from "axios";
import { Icon } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientInfoPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await Axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch({
          type: "SET_PATIENT_INFO",
          payload: patientDetailsFromApi,
        });
      } catch (e) {
        console.error(e);
      }

      if (!patient || patient?.id !== id) {
        fetchPatientDetails();
      }
    };
  }, [patient, id, dispatch]);

  const displayGenderIcon = () => {
    if (patient?.gender === "male") {
      return <Icon name="mars" size="big" />;
    } else if (patient?.gender === "female") {
      return <Icon name="venus" size="big" />;
    } else if (patient?.gender === "other") {
      return <Icon name="genderless" size="big" />;
    } else return null;
  };

  return (
    <div>
      <div>
        <h2>{patient?.name}</h2> {displayGenderIcon()}
      </div>
      <div>
        <span>ssn:</span> <span>{patient?.ssn}</span>
      </div>
      <div>
        <span>occupation:</span> <span>{patient?.occupation}</span>
      </div>
    </div>
  );
};

export default PatientInfoPage;