import { Image } from 'antd';

const ImagePreview = (img) => {
  console.log(img);

  return <Image width={2} src={img.img} />;
};

export default ImagePreview;
