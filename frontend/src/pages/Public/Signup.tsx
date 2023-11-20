import ComboBox from "@/components/Form/ComboBox";
import InputLabel from "@/components/Form/InputLabel";
import Image from "next/image";
import signupImg from "../../assets/images/signup.png";
import GreenButton from "../../components/Buttons/GreenButton";

const Signup = () => {
  return (
    <div className="md:bg container mx-auto mb-10 mt-2 px-10 md:flex md:flex-row md:items-center md:bg-[url(../assets/images/bg.jpg)] md:bg-cover lg:flex lg:flex-row lg:justify-center">
      <div className="z-10 my-5 flex w-full flex-col items-center justify-center rounded-3xl bg-gray-bg p-8 shadow-sm shadow-tp-disable-color md:m-5 md:-ml-1 md:w-96">
        <h4 className="pb-5 text-center text-2xl font-bold text-primary-color lg:text-h4">
          Registro de Postulante
        </h4>

        <form className="w-full text-sm lg:text-base">
          <ComboBox
            name={"id_type"}
            title={"Tipo de identificación:"}
            options={["Seleccione", "Cédula", "Passporte"]}
            defaultOption={""}
          />
          <InputLabel
            name={"id_number"}
            title={"Número de identificación:"}
            errorMessage={"El numero de identificación es necesario."}
          />
          <InputLabel
            name={"email"}
            title={"Correo Electrónico:"}
            placeholder={"correo@gmail.com"}
          />
          <InputLabel
            name={"email_confirm"}
            title={"Confirmar Correo:"}
            placeholder={"correo@gmail.com"}
          />

          <h6>Captcha</h6>
          <h6>
            Acepto la <strong>Politica de Privacidad*</strong>
          </h6>
        </form>

        <GreenButton content="Enviar" />
      </div>

      <div className="relative -ml-5 hidden h-96 w-96 md:block " dir="rtl">
        <div className="absolute bottom-0 left-0 h-full w-full rounded-s-3xl bg-gradient-to-t from-secondary-color from-20% via-transparent via-30% to-bg-disable to-100%  opacity-70 shadow-sm shadow-tp-disable-color"></div>
        <Image
          src={signupImg}
          alt="signup logo"
          className="h-full w-full rounded-s-3xl object-fill"
        />
        <h6 className="absolute bottom-0 left-0 right-0 p-2 text-center font-bold text-white">
          Postúlate Universidad de las Fuerzas Armadas ESPE
        </h6>
      </div>
    </div>
  );
};

export default Signup;
