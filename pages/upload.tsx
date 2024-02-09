import { useCallback, useState } from "react";
import axios from "axios";
import Input from "@/components/Input";
import { useRouter } from "next/router";


const Upload = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');

  const UploadFilmInfor = useCallback(async () => {
    console.log("call");
    try {
      
      const status = await axios.post('/api/uploads', {
        title,
        videoUrl,
        thumbnailUrl,
        genre,
        duration,
        description
      });

      if (status.status !== 200)
      {
        console.log("Tài khoản hiện tại không được phép upload phim")
      }else {
        router.push('/');
      }

    }catch (error) {
      console.log(error)
    }
  }, [title, videoUrl, thumbnailUrl, genre, duration, description, router]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-3/4 lg:max-sm: rounded-md  ">
            <h2 className="text-white text-4xl mb-8 font-semibold ">
              Tải lên phim
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                label="Tên bộ phim"
                onChange={(ev: any) => setTitle(ev.target.value)}
                id="title"
                type="text"
                value={title}
              />
              <Input
                label="Liên kết ảnh áp phích"
                onChange={(ev: any) => setThumbnailUrl(ev.target.value)}
                id="description"
                type="text"
                value={thumbnailUrl}
              />
              <Input
                label="Mô tả của phim"
                onChange={(ev: any) => setDescription(ev.target.value)}
                id="description"
                type="text"
                value={description}
              />
              <Input
                label="Liên kết phim"
                onChange={(ev: any) => setVideoUrl(ev.target.value)}
                id="videoUrl"
                type="text"
                value={videoUrl}
              />
              <Input
                label="Thể loại"
                onChange={(ev: any) => setGenre(ev.target.value)}
                id="genre"
                type="text"
                value={genre}
              />
              <Input
                label="Thời lượng"
                onChange={(ev: any) => setDuration(ev.target.value)}
                id="duration"
                type="text"
                value={duration}
              />
            </div>
            <button 
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              onClick={UploadFilmInfor}>
              Tải lên phim
            </button>

            <p className="text-neutral-500 mt-12">
              Đây là trang Netflix Clone | Tôi là  
              <span className="text-red-600"> Tăm Xỉa Răng</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;