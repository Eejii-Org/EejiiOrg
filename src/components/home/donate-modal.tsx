"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import axios from "axios";

export const DonateModal = () => {
  const [donateOpen, setDonateOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [value, setValue] = useState<number | string>(10000);
  const [selectedPyament, setSelectedPayment] = useState<"monthly" | "onetime">(
    "onetime"
  );
  const [paymentData, setPaymentData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const donate = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/donate`,
        {
          amount: value,
          method: "qpay",
          email: email == "" ? null : email,
        }
      );
      // console.log(res.data.data);
      setPaymentData(res.data.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  return (
    <>
      <button
        onClick={() => setDonateOpen(true)}
        className="px-[24px] py-[12px] text-base text-white font-semibold md:hover:bg-[#87B7BF] rounded-xl transition-all bg-primary"
      >
        Donate
      </button>
      <div
        className={`fixed top-1/2 left-1/2 ${
          donateOpen ? "fixed flex" : "hidden"
        } z-10 gap-6 w-full md:w-[1080px] -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="rounded-2xl bg-white overflow-hidden flex flex-col gap-8">
          <div className="relative h-80">
            <Image
              src="/assets/home/donatebanner.webp"
              alt="Donatebanner"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4 flex flex-col gap-6">
            <Image
              src="/assets/logo.png"
              alt="EejiiIcon"
              className="object-contain"
              height={42}
              width={168}
            />
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-semibold">
                Бидний үйл ажиллагаанд хандив өргөснөөр
              </h1>
              <p>
                Cүүлийн жилүүдэд сайн дурын ажил хийх хүсэл сонирхолтой
                хүмүүсийн тоо эрчимтэй өсөж байгаа нь гайхалтай билээ. Энэ нь
                бид бусдын төлөө сэтгэлтэй болж өсөж, хүмүүжиж байгаагийн
                илэрхийлэл юм.{" "}
              </p>
            </div>
            <h2 className="font-semibold">Бидэнд хандив өргөсөнд баярлалаа!</h2>
          </div>
        </div>
        <form
          className="p-8 rounded-2xl min-w-[400px] flex-1 flex flex-col justify-between gap-8 bg-white"
          onSubmit={(e) => {
            e.preventDefault();
            donate();
          }}
        >
          <div className="flex items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="EejiiIcon"
              className="object-contain"
              height={42}
              width={168}
            />
          </div>
          {paymentData ? (
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-center flex-1">
                <Image
                  src={"data:image/png;base64, " + paymentData.details.qr_image}
                  alt="PaymentQR"
                  width={300}
                  height={300}
                />
              </div>
              <Button
                className="py-4 w-full !text-[18px]"
                onClick={() => setDonateOpen(false)}
              >
                Дуусгах
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col flex-1 gap-4">
                {/* <div className="flex flex-row border rounded-xl box-border mb-8">
              <button
                onClick={() => setSelectedPayment("onetime")}
                className={`flex-1 py-3 box-border ${
                  selectedPyament == "onetime"
                    ? "font-semibold text-black  border border-primary bg-[#EBF3F4] rounded-xl"
                    : "font-medium text-black/70"
                }`}
              >
                Нэг удаа
              </button>
              <button
                onClick={() => setSelectedPayment("monthly")}
                className={`flex-1 py-3 pr-2 box-border flex items-center justify-center gap-1 ${
                  selectedPyament == "monthly"
                    ? "font-semibold text-black border border-primary bg-[#EBF3F4] rounded-xl"
                    : "font-medium text-black/70"
                }`}
              >
                <HeartIcon />
                Сар бүр
              </button>
            </div> */}
                <div className="grid grid-cols-3 gap-4">
                  {[5000, 10000, 20000, 50000, 100000, 500000].map(
                    (tugrug, index) => (
                      <button
                        onClick={() => setValue(tugrug)}
                        className="py-[10px] rounded-lg border border-[#CCCCCC] flex items-center justify-center hover:bg-[#CCCCCC] transition-all"
                        key={index}
                      >
                        ₮{tugrug}
                      </button>
                    )
                  )}
                </div>
                <div className="flex flex-row gap-2 items-center rounded-2xl border border-[#CCCCCC] px-4">
                  <div className="text-xl  text-black/70">₮</div>
                  <input
                    required
                    className={`outline-none w-full py-[14px] text-2xl text-primary font-bold`}
                    value={value}
                    type="number"
                    onChange={(e) => {
                      if (e.target.value == "") {
                        setValue("");
                      } else {
                        setValue(Number(e.target.value));
                      }
                    }}
                  />
                </div>
                <Input
                  label="Имэйл"
                  placeholder="email@domain.com"
                  type="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                className="py-4 w-full !text-[18px]"
                disabled={loading}
                type="submit"
              >
                {loading ? "Loading..." : "Хандив өгөх"}
              </Button>
            </>
          )}
        </form>
      </div>
      <div
        className={`w-screen h-screen fixed top-0 left-0 ${
          donateOpen ? "fixed flex" : "hidden"
        } bg-black/40 items-center justify-center`}
        onClick={() => setDonateOpen(false)}
      ></div>
    </>
  );
};
const HeartIcon = () => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 12.5C8 12.5 1.75 9.00001 1.75 4.75001C1.75 3.99868 2.01031 3.27057 2.48664 2.68954C2.96297 2.10851 3.62589 1.71046 4.36262 1.56312C5.09935 1.41577 5.86438 1.52823 6.52754 1.88136C7.1907 2.23449 7.71103 2.80648 8 3.50001V3.50001C8.28897 2.80648 8.8093 2.23449 9.47246 1.88136C10.1356 1.52823 10.9006 1.41577 11.6374 1.56312C12.3741 1.71046 13.037 2.10851 13.5134 2.68954C13.9897 3.27057 14.25 3.99868 14.25 4.75001C14.25 9.00001 8 12.5 8 12.5Z"
      fill="#EB547D"
      stroke="#EB547D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
// import { FallbackImage } from '@/components/common/fallback-image';
// import { priceFormat } from '@/lib/utils/price';
// import {
//   Image,
//   Button,
//   Text,
//   Grid,
//   Modal,
//   Paper,
//   Title,
//   Stack,
//   SimpleGrid,
//   NumberInput,
//   UnstyledButton,
//   TextInput,
//   Flex,
// } from '@mantine/core';
// import { useDisclosure, useMediaQuery } from '@mantine/hooks';
// import { useState } from 'react';

// export const DonateModal = ({ label }: { label: string }) => {
//   const [donateAmount, setDonateAmount] = useState(0);
//   const [opened, { close, open }] = useDisclosure();
//   const isMobile = useMediaQuery('(max-width: 50em)');

//   const amounts = [10000, 20000, 40000, 50000, 80000, 100000];
//   return (
//     <>
//       <button
//         className="px-[24px] py-[10px] text-lg font-bold hover:bg-primary/60 text-white rounded-xl bg-primary transition-all mx-5 mb-5 md:shadow-3xl md:m-0 md:ml-3 "
//         onClick={open}
//       >
//         {label}
//       </button>
//       <Modal
//         opened={opened}
//         bg={'none'}
//         fullScreen={isMobile}
//         onClose={close}
//         size={'80%'}
//         overlayProps={{
//           backgroundOpacity: 0.55,
//           blur: 3,
//         }}
//         withCloseButton={false}
//         shadow="0"
//         styles={{
//           header: {
//             backgroundColor: 'transparent',
//           },
//           content: {
//             backgroundColor: 'transparent',
//           },
//         }}
//       >
//         <Grid columns={13}>
//           <Grid.Col span={{ base: 13, lg: 7 }} hidden={isMobile}>
//             <Paper bg={'white'} radius={'lg'} className="overflow-hidden">
//               <FallbackImage
//                 src={''}
//                 alt="img"
//                 width={600}
//                 fullWidth
//                 height={300}
//               />
//               <Stack px={'lg'} py={'md'}>
//                 <Image
//                   src="/images/home/foundation_logo.jpg"
//                   alt="foundation Logo"
//                   h={70}
//                   w={200}
//                   fit="contain"
//                 />
//                 <Title order={5}>Бидний үйл ажиллагаанд хандив өргөснөөр</Title>
//                 <Text>
//                   Cүүлийн жилүүдэд сайн дурын ажил хийх хүсэл сонирхолтой
//                   хүмүүсийн тоо эрчимтэй өсөж байгаа нь гайхалтай билээ. Энэ нь
//                   бид бусдын төлөө сэтгэлтэй болж өсөж, хүмүүжиж байгаагийн
//                   илэрхийлэл юм. Бидэнд хандив өргөсөнд баярлалаа! дэлгэрэнгүй
//                   мэдээлэлтэй танилцах бол энд дарна уу Бидэнтэй холбогдох
//                 </Text>
//                 <Title order={5}>Бидэнд хандив өргөсөнд баярлалаа!</Title>
//               </Stack>
//             </Paper>
//           </Grid.Col>
//           <Grid.Col span={{ base: 13, lg: 6 }}>
//             <Paper bg={'white'} p={20} radius={'lg'} h={'100%'}>
//               <Stack gap={'xl'} justify="space-between" h={'100%'}>
//                 <Stack gap={'xl'} justify="space-between">
//                   <Flex justify={{ base: 'space-between', lg: 'center' }}>
//                     <Image
//                       src="/images/home/foundation_logo.jpg"
//                       alt="foundation Logo"
//                       h={70}
//                       w={200}
//                       fit="contain"
//                     />
//                     <Button onClick={close} variant="subtle" hiddenFrom="sm">
//                       Хаах
//                     </Button>
//                   </Flex>
//                   <SimpleGrid cols={2} spacing={'xs'} w={'100%'}>
//                     {amounts.map(amount => (
//                       <UnstyledButton
//                         onClick={() => setDonateAmount(amount)}
//                         key={amount}
//                       >
//                         <Paper withBorder p={20} radius={'md'}>
//                           <Text size="sm">{priceFormat(amount, 'MNT')}</Text>
//                         </Paper>
//                       </UnstyledButton>
//                     ))}
//                   </SimpleGrid>
//                   <NumberInput
//                     radius={'md'}
//                     w="100%"
//                     styles={{
//                       input: {
//                         color: 'var(--mantine-color-primary-9)',
//                         fontWeight: 700,
//                         fontSize: 24,
//                       },
//                     }}
//                     leftSection="₮"
//                     decimalScale={2}
//                     thousandSeparator=","
//                     fixedDecimalScale
//                     hideControls
//                     value={donateAmount / 100}
//                     size="xl"
//                   />
//                   <TextInput placeholder="Email" size="lg" label="Имэйл" />
//                 </Stack>
//                 <Button fullWidth color="primary" size="lg" radius={'md'}>
//                   Хандивлах
//                 </Button>
//               </Stack>
//             </Paper>
//           </Grid.Col>
//         </Grid>
//       </Modal>
//     </>
//   );
// };
