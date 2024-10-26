import { Card } from 'antd';
import img1 from '../../../assets/images/dance1.png';
import img2 from '../../../assets/images/dance2.png';
import img3 from '../../../assets/images/dance3.png';
import img4 from '../../../assets/images/dance5.png';
import { Carousel } from 'antd';
const Cubes = () => {
  return (
    <>
      <Carousel autoplay className="carousel-main">
        <div>
          <img src={img1} alt="" />
        </div>
        <div>
          <img src={img2} alt="" />
        </div>
        <div>
          <img src={img3} alt="" />
        </div>
        <div>
          <img src={img4} alt="" />
        </div>
      </Carousel>
    </>
  );
};
export default Cubes;
