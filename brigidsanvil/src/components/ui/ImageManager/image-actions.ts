import { Image } from "@/components/types/image";
import { addNotification } from "@/components/store/notificationsSlice";

export function getImageViewUrl(image: Image) {
  return "https://www.worldanvil.com/i/" + image.id;
}

export function getImageEditUrl(image: Image) {
  return (
    "https://www.worldanvil.com/world/apollo/file/" + image.id + "/replace"
  );
}

export function getImageWaUrl(image: Image) {
  return image.pageUrl || image.url;
}

export async function copyImageId(
  image: Image,
  dispatch: (action: any) => void,
) {
  try {
    await navigator.clipboard.writeText(image.id);
    dispatch(addNotification(`Copied id for "${image.title}".`, "success"));
  } catch (error) {
    console.error("Error copying image id:", error);
    dispatch(addNotification("Unable to copy image id.", "danger"));
  }
}

export async function copyImageURL(
  image: Image,
  dispatch: (action: any) => void,
) {
  try {
    await navigator.clipboard.writeText(getImageWaUrl(image));
    dispatch(addNotification(`Copied URL for "${image.title}".`, "success"));
  } catch (error) {
    console.error("Error copying image URL:", error);
    dispatch(addNotification("Unable to copy image URL.", "danger"));
  }
}
