import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "@/utils/api";

import MainHeroTxt from "../_components/design/MainHeroTxt"

const slide_image_1  = '/assets/django/f-t-1b2.png';

import SwiperSlider from '../_components/design/SwiperSlider'

export default function Home() {

  return (
    <>
      <Head>
        <title>Must See</title>
        <meta name="description" content="Blog sur le must du cinéma" />

      </Head>

      <section className="hero flex flex-col items-center justify-center gap-1 md:gap-0 bg-hero w-screen min-h-max">
                <img className="featured-title bg-spec" src={`${slide_image_1}`} alt="" width={192} height={192} />

                <MainHeroTxt  click={null}/>

            </section>



          <div>
          <h4 className='section-title'>Movies</h4>

<section className="swiper movies">
    <div className=''>
        <SwiperSlider movietype={"movie"} />
    </div>
</section>

<h4 className='section-title'>Séries</h4>

<section className="swiper movies">
    <div className=''>
        <SwiperSlider movietype={"tvshow"} />
    </div>
</section>

<section className="community flex flex-col gap-3 items-center min-w-screen bg-stone-950 border-t-2 border-teal-950">
<h4 className='section-title  min-h-[10svh] mt-2 flex items-center bg-stone-950 border-t-2 border-teal-950 self-start'>
La communauté<em className='font-poetsenone font-extrabold text-red-500'>&nbsp;&nbsp;Must See</em></h4>
<div className="min-h-10 flex flex-col items-center">
  <p className='mx-auto px-12 ms-6 '>  Rejoins la communauté des MustSee's et partage sur les ..... avec les autres membres !</p>
  {/* <p className='p-12 ps-20 line-clamp-1 md:line-clamp-none'>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet temporibus eos autem iste consequatur pariatur alias id ipsa nam veniam quibusdam asperiores, ab, iusto cupiditate fugiat? Voluptatum sit distinctio cum!
  Deleniti consequuntur, ex repudiandae sint sapiente perspiciatis ut eaque voluptates eligendi placeat rem dolor deserunt. Soluta unde esse quam officiis illum expedita ipsa modi, sit aliquam alias porro saepe exercitationem?
  Odio eius dolorum, excepturi soluta qui voluptatibus consequatur ut illo a. Repellendus modi sed provident incidunt maxime quod cupiditate et neque amet pariatur deleniti harum delectus rem porro, qui aut!
  Magni quasi saepe possimus sint. Repudiandae sit nesciunt voluptatum nam assumenda accusamus, voluptate ipsam nihil quaerat aliquam quisquam iusto quam, eum quidem voluptatibus laboriosam cum ea minus dolorem aliquid dolor?
  Provident nobis dolorum earum officiis, exercitationem incidunt quod voluptatem adipisci ipsum voluptatibus error blanditiis, cupiditate hic facilis animi illum sed. In modi architecto cumque, veritatis ab repellendus fuga dicta ullam.
  Maiores perferendis adipisci nobis omnis iste deserunt quas veniam sint itaque? Vero unde veritatis amet enim facere? Blanditiis natus perferendis, facere nostrum veniam nam fuga ratione laboriosam atque consequuntur laudantium.
  Natus vitae ex corporis officia ullam praesentium possimus nam sequi. Incidunt corrupti quaerat ut cumque adipisci nihil ea? Qui nesciunt hic dolor odio omnis dolores error amet ea sint explicabo?
  Natus assumenda, reprehenderit ullam animi nam corporis qui ea recusandae quod perferendis error excepturi officiis tempora quisquam doloribus saepe deleniti explicabo culpa molestiae quidem accusamus id sit veritatis? Ullam, quas.
  Molestias recusandae debitis aperiam obcaecati impedit aspernatur quam, quae, quia minus non minima corporis voluptates delectus sint qui iusto at corrupti soluta accusamus reiciendis perspiciatis harum expedita. Iure, sit maxime.
  Nostrum quam doloremque pariatur perspiciatis dicta voluptatum eveniet perferendis officia ea nam deleniti commodi facilis ullam voluptate similique soluta optio, quo, veniam ipsa hic aliquam autem dolores! Vel, autem perspiciatis!
  </p> */}
</div>
</section>

          </div>


    </>
  );
}


