import CreativeEditorSDKWithNoSSR from "@/components/imglyEditor/CreativeEditorNoSSR";

export default function CreativeEditor() {
  let config = {
    // baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.18.0/assets'
  };
  return <CreativeEditorSDKWithNoSSR config={config} />;
}
