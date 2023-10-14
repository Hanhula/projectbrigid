import Head from "next/head";
import { Inter } from "next/font/google";
import Homepage from "@/components/ui/Homepage/homepage";
import styles from "@/styles/Home.module.css";
import { selectIdentity } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const identity = useSelector(selectIdentity);
  const authToken = useSelector(selectAuthToken);

  return (
    <>
      <Head>
        <title>{"Brigid's Anvil"}</title>
        <meta
          name="description"
          content="Brigid's Anvil is a community-developed WorldAnvil extension application first concepted and architected by Hanhula."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={`${styles.main}`}>
          {authToken && identity.success && <Homepage />}
        </div>
      </main>
    </>
  );
}
