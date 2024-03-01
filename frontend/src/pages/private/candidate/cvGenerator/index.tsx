import React, { useState, useEffect } from "react";
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

const styles = StyleSheet.create({
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

const PdfTemplate = () => {
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  const [userCV, setUserCV] = useState<CvExpandend | null>();
  const userId = "msof6xv1zl55pof";

  // Para obtener la información del usuario
  useEffect(() => {
    getUserInfo(userId, setUser);

    if (user && user.cv) {
      // console.log("user: "+user, "userID: "+user.id, "user values: "+user.cv.values, user.cv);
      // getCVs(setUserCV, user?.cv?.values[0]);
      getCVs(setUserCV, user?.expand?.cv?.id);
    }
  }, []);

  console.log(user?.expand?.cv?.id);
    console.log(userCV);
  useEffect(() => {
    if (user) {
      if (user.avatar instanceof File) {
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
  }, [user]);

  return (
    <Document>
      <PageWrapper>
        <View style={tw("w-full")}>
          <View style={tw("flex flex-col justify-center items-center")}>
            <Text
              style={tw("text-red-500  text-center font-bold text-2xl mb-5")}
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
          </View>
          {user && (
            <View style={tw("flex flex-row justify-around")}>
              <View style={tw("flex flex-col")}>
                <View>
                  <Text style={styles.sectionTitle}>
                    Numero de identificación:
                  </Text>
                  <Text style={styles.sectionDescription}>
                    {user?.identificationNumber}
                  </Text>
                </View>

                <View style={styles.sectionItem}>
                  <Text style={styles.sectionTitle}>Nombre:</Text>
                  <Text style={styles.sectionDescription}>
                    {userCV?.personalData?.name}
                  </Text>
                </View>

                <View style={styles.sectionItem}>
                  <Text style={styles.sectionTitle}>Apellido:</Text>
                  <Text style={styles.sectionDescription}>
                    {/* {userCV?.personalData?.lastName1 + " " + userCV?.personalData?.lastName2} */}
                  </Text>
                </View>
                <View style={styles.sectionItem}>
                  <Text style={styles.sectionTitle}>Email:</Text>
                  <Text style={styles.sectionDescription}>{user?.email}</Text>
                </View>
              </View>

              {avatarUrl && (
                <img src={avatarUrl} style={styles.avatar} alt="Avatar" />
              )}
            </View>
          )}
        </View>
      </PageWrapper>
    </Document>
  );
};
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {user.length > 0 && (
//           <View style={styles.section}>
//             <Text style={styles.text}>ID: {user[0].id}</Text>
//             <Text style={styles.text}>Period: {user[0].period}</Text>
//             <Text style={styles.text}>
//               Identification Number: {user[0].identificationNumber}
//             </Text>
//             <Text style={styles.text}>Name: {user[0].name}</Text>
//             <Text style={styles.text}>Last Name: {user[0].lastName}</Text>
//             <Text style={styles.text}>Email: {user[0].email}</Text>
//             {avatarUrl && (
//               <img src={avatarUrl} style={styles.image} alt="Avatar" />
//             )}
//             <Text style={styles.text}>Role: {user[0].role}</Text>
//             <Text style={styles.text}>
//               Phase Status: {user[0].phaseStatus}
//             </Text>
//             <Text style={styles.text}>Offer: {user[0].offer}</Text>
//           </View>
//         )}
//       </Page>
//     </Document>
//   );
// };

export default PdfTemplate;
