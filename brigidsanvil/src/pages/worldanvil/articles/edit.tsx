import { selectIdentity } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
import Head from "next/head";
import { useSelector } from "react-redux";
import "./edit.scss";
import { WorldAnvilEditor } from "@/components/ui/ArticleEdit/editor";

export default function EditPage() {
  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);

  return (
    <div>
      <WorldAnvilEditor></WorldAnvilEditor>
    </div>
  );
}
