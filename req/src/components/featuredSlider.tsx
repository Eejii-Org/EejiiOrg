"use client";
import { Carousel, Typography, Tag, Row, Col, Space, Button } from "antd";

const { Title, Text } = Typography;

export const FeaturedSlider = ({ featured }) => {
  return (
    <Carousel adaptiveHeight>
      {featured.map((item, key) => {
        const mainImage = item.images.filter(
          (image) => image.type === "main"
        )[0];
        const backgroundImage = mainImage
          ? `url(${mainImage.path})`
          : "url('/assets/placeholder.svg')";

        return (
          <div className="w-screen h-auto relative" key={key}>
            <div
              className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center bg-gradient-to-r from-slate-900 to-slate-00 opacity-90"
              style={{ zIndex: 1 }}
            />

            <div
              style={{
                backgroundImage: backgroundImage,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative z-10 py-40">
                <div className="container">
                  <Row>
                    <Col span={10}>
                      <div className="mr-auto place-self-center">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white text[#f1ff84]">
                          {item.title}
                        </h1>
                        <p
                          className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-white"
                          dangerouslySetInnerHTML={{
                            __html: item.shortDescription,
                          }}
                        ></p>
                        <Button>Дэлгэрэнгүй</Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};
