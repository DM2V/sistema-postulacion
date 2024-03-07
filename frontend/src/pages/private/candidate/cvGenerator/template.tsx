import React, { useState, useEffect, ReactNode } from "react";
import { User } from "@/types/user";
import { getUserInfo } from "@/utils/fetch_functions/user";
import { BACKEND_ADDRESS } from "@/utils/pocketbase";
import { CvExpandend } from "@/types/cv";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import tailwindConfig from "../../../../../tailwind.config";
const tw = createTw(tailwindConfig);
import { getCVs } from "@/utils/fetch_functions/cv";
import { StylesConfig } from "react-select";

const styles = StyleSheet.create({
  container: {
    // Define your container styles here (e.g., margin, padding)
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  page: {
    flexDirection: "row",
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bigTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  separator: {
    borderBottom: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  section: {
    flexDirection: "row",
    marginBottom: 10,
  },
  sectionItem: {
    marginRight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginRight: 20,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  bgImage: {
    position: "absolute",
    zIndex: -1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    width: 200,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
  },
});

interface ContainerProps {
  children: ReactNode;
  style?: object;
}

const Container: React.FC<ContainerProps> = ({ children, style }) => (
  <View style={{ ...styles.container, ...style }}>{children}</View>
);
const PageWrapper = ({
  children,
  bgImage,
}: {
  children: React.ReactNode;
  bgImage?: { src: string };
}) => (
  <Page size="A4" style={styles.page}>
    <View>{children}</View>
    {bgImage && (
      <Image
        src={bgImage.src}
        style={{
          ...styles.bgImage,
          ...tw("absolute w-full h-full bg-blue-100 "),
        }}
      />
    )}
  </Page>
);

const Section = <T extends string>(props: { title: T; description: T }) => (
  <View style={tw("flex flex-row items-start")}>
    <Text style={styles.sectionTitle}>{props.title}:</Text>
    <Text style={styles.sectionDescription}>{props.description}</Text>
  </View>
);

const PdfTemplate = () => {
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  const [userCV, setUserCV] = useState<CvExpandend | null>();
  const userId = "msof6xv1zl55pof";

  // Para obtener la información del usuario
  useEffect(() => {
    getUserInfo(userId, setUser);
    console.log(user);
    if (user) {
      getCVs(setUserCV, user?.expand?.cv?.id);
    }
  }, []);

  console.log("CV" + userCV);

  useEffect(() => {
    if (user) {
      if (userCV?.personalData instanceof File) {
        const reader = new FileReader();
        reader.onload = () => {
          setAvatarUrl(reader.result as string);
        };
        reader.readAsDataURL(user.avatar);
      } else if (typeof user.avatar === "string") {
        setAvatarUrl(
          BACKEND_ADDRESS +
            "/api/files/_pb_users_auth_/" +
            user.id +
            "/" +
            user.avatar,
        );
      }
    }
    console.log(userCV?.academicTraining);
  }, [user]);

  return (
    <Document>
      <PageWrapper>
        {/* {userCV && ( */}
        <View style={tw("w-full")}>
          <Container style={tw("flex flex-col justify-center items-center")}>
            <Text
              style={tw("text-red-500 text-center font-bold text-2xl mb-5")}
            >
              ¡Por favor para continuar verifique que la información sea
              correcta!
            </Text>

            <Text style={styles.title}>HOJA DE VIDA FORMATO ESPE</Text>
            <Text style={styles.subTitle}>INFORMACIÓN PERSONAL</Text>
            <Text
              style={tw(
                "border-y-2 text-center border-gray-400 py-2 mb-4 font-bold w-full",
              )}
            >
              VERIFIQUE QUE SUS DATOS ESTEN CORRECTOS
            </Text>
            <Text style={styles.sectionTitle}>DATOS PERSONALES</Text>
          </Container>

          <Container style={tw("flex flex-row justify-around")}>
            <View style={tw("flex flex-col")}>
              <Section
                title="NÚMERO DE DOCUMENTO"
                description={user?.identificationNumber || ""}
              />
              <Section
                title="NOMBRE"
                description={userCV?.personalData?.name || ""}
              />
              <Section
                title="APELLIDO"
                description={
                  userCV?.personalData?.lastName1 +
                    " " +
                    userCV?.personalData?.lastName2 || ""
                }
              />
              <Section
                title="AUTO IDENTIFICACIÓN ÉTNICA"
                description={userCV?.personalData?.ethnicIdentification || ""}
              />
              <Section
                title="NACIONALIDAD"
                description={userCV?.personalData?.nationality || ""}
              />
            </View>
            {avatarUrl && (
              <img src={avatarUrl} style={styles.avatar} alt="Avatar" />
            )}
          </Container>
          <Container style={tw("flex flex-col")}>
            <Text style={tw("text-center py-4 mb-4 font-bold w-full")}>
              INFORMACIÓN ADICIONAL DISCAPACIDAD Y/O ENFERMEDAD CATASTRÓFICA{" "}
            </Text>
            <Section
              title="CAPACIDAD ESPECIAL"
              description={
                userCV?.personalData?.specialCapacity === "0"
                  ? "NO"
                  : userCV?.personalData?.specialCapacity || "NO"
              }
            />
            <Section
              title="ENFERMEDAD CATASTROFICA"
              description={
                userCV?.personalData?.catastrophicDisease === "0"
                  ? "NO"
                  : userCV?.personalData?.catastrophicDisease || "SÍ"
              }
            />
          </Container>
          <Container style={tw("flex flex-col")}>
            <Text style={tw("text-center py-4 mb-4 font-bold w-full")}>
              DIRECCIÓN DOMICILIARÍA PERMANENTE{" "}
            </Text>
            <Section
              title="PROVINCIA"
              description={userCV?.homeAddress?.province || ""}
            />
            <Section
              title="CANTÓN"
              description={userCV?.homeAddress?.canton || ""}
            />
            <Section
              title="PARROQUIA"
              description={userCV?.homeAddress?.parish || ""}
            />
            <Section
              title="CALLE PRINCIPAL"
              description={userCV?.homeAddress?.mainStreet || ""}
            />
            <Section
              title="CALLE SECUNDARIA"
              description={userCV?.homeAddress?.secondaryStreet || ""}
            />
            <Section
              title="NÚMERO DE CASA"
              description={userCV?.homeAddress?.number || ""}
            />
            <Section
              title="REFERENCIA"
              description={userCV?.homeAddress?.reference || ""}
            />
            <Section
              title="TELÉFONO DOMICILIARIO"
              description={userCV?.homeAddress?.homePhone || ""}
            />
            <Section
              title="TELÉFONO CELULAR"
              description={userCV?.homeAddress?.cellPhone || ""}
            />
            <Section
              title="TELÉFONO TRABAJO"
              description={userCV?.homeAddress?.workPhone || ""}
            />
            <Section
              title="EXTENSIÓN"
              description={userCV?.homeAddress?.extencion || ""}
            />
          </Container>

          <Container style={tw("flex flex-col")}>
            <Text style={tw("text-center py-4 mb-4 font-bold w-full")}>
              CONTACTO DE EMERGENCIA{" "}
            </Text>
            <Section
              title="APELLIDO"
              description={
                userCV?.emergencyContact?.lastName1 +
                  " " +
                  userCV?.emergencyContact?.lastName2 || ""
              }
            />
            <Section
              title="TIPO DE DOCUMENTO"
              description={userCV?.emergencyContact?.typeIdentification || ""}
            />
            <Section
              title="NÚMERO DE DOCUMENTO"
              description={userCV?.emergencyContact?.identification || ""}
            />
            <Section
              title="PARENTESCO"
              description={userCV?.emergencyContact?.relationship || ""}
            />
            <Section
              title="PROVINCIA"
              description={userCV?.emergencyContact?.province || ""}
            />
            <Section
              title="CANTÓN"
              description={userCV?.emergencyContact?.canton || ""}
            />
            <Section
              title="PARROQUIA"
              description={userCV?.emergencyContact?.parish || ""}
            />
            <Section
              title="CALLE PRINCIPAL"
              description={userCV?.emergencyContact?.mainStreet || ""}
            />
            <Section
              title="CALLE SECUNDARIA"
              description={userCV?.emergencyContact?.secondaryStreet || ""}
            />
            <Section
              title="NÚMERO DE CASA"
              description={userCV?.emergencyContact?.number || ""}
            />
            <Section
              title="REFERENCIA"
              description={userCV?.emergencyContact?.reference || ""}
            />
            <Section
              title="TELÉFONO DOMICILIARIO"
              description={userCV?.emergencyContact?.homePhone || ""}
            />
            <Section
              title="TELÉFONO CELULAR"
              description={userCV?.emergencyContact?.cellPhone || ""}
            />
          </Container>
          <Container style={tw("flex flex-col")}>
            <Text style={tw("text-center py-4 mb-4 font-bold w-full")}>
              FORMACIÓN ACADÉMICA Y PUBLICACIONES{" "}
            </Text>
            <View style={tw("flex flex-col")}>

              
            </View>
          </Container>
        </View>
      </PageWrapper>
    </Document>
  );
};

export default PdfTemplate;
