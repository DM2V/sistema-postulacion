import React, { FC, useState, useEffect } from "react";
import {CV, PersonalInformation, EmergencyContact } from "@/types/cv";
import GreenButton from "@/components/Buttons/GreenButton";
import InputLabel from "@/components/Form/InputLabel";
import DateInput from "@/components/Form/DateInput";
import ComboBox from "@/components/Form/ComboBox";
import CheckBox from "@/components/Form/CheckBox";
import {
  validateNotEmpty,
  validateNumbersOnly,
} from "@/utils/validations";


const PersonalInformationPage: FC = () => {
    const gender = ["hombre", "mujer"];

    const [formData, setFormData] = useState<CV>({
        personalInformation: {
          province: '',
          canton: '',
          parish: '',
          mainStreet: '',
          secondaryStreet: '',
          reference: '',
          number: '',
          homePhone: '',
          cellPhone: '',
          workPhone: '',
          extencion: '',
        },
        EmergencyContact: {
          name: '',
          lastName1: '',
          lastName2: '',
          typeIdentification: '',
          identification: '',
          relationship: '',
          province: '',
          canton: '',
          parish: '',
          mainStreet: '',
          secondaryStreet: '',
          reference: '',
          number: '',
          homePhone: '',
          cellPhone: '',
        },
      });
    
      const handleChange = (fieldName: string, value: string, formType: 'personalInfo' | 'emergencyContact') => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [formType]: {
            ...prevFormData[formType],
            [fieldName]: value,
          },
        }));
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Submit the combined form data
        console.log('Form Data Submitted:', formData);
      };
    


    return (
        <div className='w-5/6'>
            <div>
                <h1 className='text-ter-color'>Información Personal</h1>
            </div>
            <div className='p-8  bg-gray-bg  rounded-r-3xl shadow-lg'
                style={{
                    boxShadow: "15px -6px 0px -7px rgba(0, 74, 62, 0.20), 0px 4px 4px 0px rgba(0, 74, 62, 0.25), 0px -2px 4px 0px rgba(0, 74, 62, 0.25)"
                }}
            >
                <div >
                    <h4 className='text-state-hover font-bold py-4'>Dirección Domiciliaria Permanente</h4>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 pb-4'>
                        <ComboBox
                            name="province"
                            title="Provincia:"
                            options={gender}
                            onChange={handleFormChange}
                        />
                        <ComboBox
                            name="canton"
                            title="Cantón:"
                            options={gender}
                            onChange={handleFormChange}
                        />
                        <ComboBox
                            name="parish"
                            title="Parroquia:"
                            options={gender}
                            onChange={handleFormChange}
                        />
                        <InputLabel
                            name="mainStreet"
                            title="Calle Principal:"
                            onChange={handleFormChange}
                            validationFunction={validateNotEmpty}
                        />
                        <InputLabel
                            name="secondaryStreet"
                            title="Calle Secundaria:"
                            onChange={handleFormChange}
                            validationFunction={validateNotEmpty}
                        />
                        <InputLabel
                            name="reference"
                            title="Referencia:"
                            onChange={handleFormChange}
                            validationFunction={validateNotEmpty}
                        />
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 pb-4 w-5/6'>
                        <InputLabel
                            name="number"
                            title="Número:"
                            onChange={handleFormChange}
                            validationFunction={validateNumbersOnly}
                        />
                        <InputLabel
                            name="homePhone"
                            title="Teléfono domicilio:"
                            onChange={handleFormChange}
                            validationFunction={validateNumbersOnly}
                        />
                        <InputLabel
                            name="mobilePhone"
                            title="Teléfono celular:"
                            onChange={handleFormChange}
                            validationFunction={validateNumbersOnly}
                        />
                        <InputLabel
                            name="workPhone"
                            title="Teléfono trabajo:"
                            onChange={handleFormChange}
                            validationFunction={validateNumbersOnly}
                        />
                        <InputLabel
                            name="extencion"
                            title="Extensión:"
                            onChange={handleFormChange}
                            validationFunction={validateNumbersOnly}
                        />
                    </div>
                    <div>
                        <h4 className='text-state-hover font-bold py-4'>Contacto de emergencia</h4>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 pb-4 lg:w-4/5 w-full'>
                            <InputLabel
                                name="emergencyName"
                                title="Nombres:"
                                onChange={handleFormChange}
                                validationFunction={validateNotEmpty}
                            />
                            <InputLabel
                                name="emergencyLastName1"
                                title="Apellido Paterno:"
                                onChange={handleFormChange}
                                validationFunction={validateNotEmpty}
                            />
                            <InputLabel
                                name="emergencyLastName2"
                                title="Apellido Materno:"
                                onChange={handleFormChange}
                                validationFunction={validateNotEmpty}
                            />
                            <ComboBox
                                name="EmergencyTypeIdentification"
                                title="Tipo de identificación:"
                                options={gender}
                                onChange={handleFormChange}
                            />
                            <InputLabel
                                name="emergencyIdentification"
                                title="Numero de identificación:"
                                onChange={handleFormChange}
                                validationFunction={validateNumbersOnly}
                            />
                            <ComboBox
                                name="emergencyRelationship"
                                title="Parentesco:"
                                options={gender}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 pb-4'>
                            <ComboBox
                                name="EmergencyProvince"
                                title="Provincia:"
                                options={gender}
                                onChange={handleFormChange}
                            />
                            <ComboBox
                                name="EmergencyCanton"
                                title="Cantón:"
                                options={gender}
                                onChange={handleFormChange}
                            />
                            <ComboBox
                                name="EmergencyParish"
                                title="Parroquia:"
                                options={gender}
                                onChange={handleFormChange}
                            />
                            <InputLabel
                                name="emergencyMainStreet"
                                title="Calle Principal:"
                                onChange={handleFormChange}
                                validationFunction={validateNotEmpty}
                            />
                            <InputLabel
                                name="emergencySecondaryStreet"
                                title="Calle Secundaría:"
                                onChange={handleFormChange}
                                validationFunction={validateNotEmpty}
                            />
                            <InputLabel
                                name="emergencyReference"
                                title="Referencia:"
                                onChange={handleFormChange}
                                validationFunction={validateNotEmpty}
                            />
                        </div>
                        {/* 5-6 */}
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 pb-4 lg:w-3/6 w-full'>
                            <InputLabel
                                name="emergencyNumber"
                                title="Número:"
                                onChange={handleFormChange}
                                validationFunction={validateNumbersOnly} />
                            <InputLabel
                                name="emergencyHomePhone"
                                title="Teléfono domicilio:"
                                onChange={handleFormChange}
                                validationFunction={validateNumbersOnly} />
                            <InputLabel
                                name="emergencyMobilePhone"
                                title="Teléfono celular:"
                                onChange={handleFormChange}
                                validationFunction={validateNumbersOnly} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-4 flex justify-end'>
            <GreenButton content="Siguiente" />
            </div>
        </div>
    );

}

export default PersonalInformationPage;