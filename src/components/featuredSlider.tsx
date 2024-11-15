"use client";
import { Carousel, Typography, Tag, Row, Col, Space, Button } from "antd";

const { Title, Text } = Typography;

export const FeaturedSlider = () => {
  return (
    <Carousel>
      <div className="w-screen relative">
        <div
          className="w-full h-full absolute top-0 left-0 bg-cover bg-center bg-gradient-to-r from-slate-900 to-slate-00 opacity-90"
          style={{ zIndex: 1 }}
        ></div>
        <div
          className="w-screen"
          style={{
            backgroundImage: "url('/assets/event/banner.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 py-40">
            <div className="container">
              <Row>
                <Col span={8}>
                  <div className="mr-auto place-self-center">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white text[#f1ff84]">
                      Дулаан өвөлжөөрэй 2024
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-white">
                      "Дулаан өвөлжөөрэй 2024" аяны цугласан хандивын үлдсэн 70%
                      мэдээж "БАДАМЛЯНХУА АСРАМЖИЙН ТӨВ”-дөө хүргэж өглөө.
                    </p>
                    <Button>Дэлгэрэнгүй</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <div>2</div>
    </Carousel>
  );
};
