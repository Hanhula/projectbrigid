import { selectIdentity, selectWorld } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
import Head from "next/head";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import ImageManager from "@/components/ui/ImageManager/image-manager";
import "./images.scss";

export default function Images() {
  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);
  const world = useSelector(selectWorld);

  return (
    <Container id="image-manager-container" className="py-4">
      <Head>
        <title>Image Manager | Brigid&apos;s Anvil</title>
      </Head>
      {authToken && identity.success && world.id ? (
        <>
          <h1>Image Manager</h1>
          <ImageManager />
        </>
      ) : (
        <>
          <h1 className="text-center" style={{ marginTop: "0.3em" }}>
            Image Manager
          </h1>
          <p className="text-center">
            You must be logged in and have a world selected to use this feature.
          </p>
        </>
      )}
    </Container>
  );
}
