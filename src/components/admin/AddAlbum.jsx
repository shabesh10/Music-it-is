import React, { useState } from "react";
import Spinner from "../../helpers/Spinner";
import { doc, setDoc } from "firebase/firestore";
import { __DB } from "../../backend/FirebaseConfig";

const AddAlbum = () => {
  let [isLoading, setIsLoading] = useState(false);

  let [album, setAlbum] = useState({
    albumname: "",
    albumposter: null,
    releasedate: "",
    languages: "",
    albumdescription: "",
  });

  let { albumname, albumposter, releasedate, languages, albumdescription } =
    album;

  let handleAlbumChange = (event) => {
    let value = event.target.value;
    let key = event.target.name;
    setAlbum({ ...album, [key]: value });
  };

  let handleAlbumPosterChange = (event) => {
    let file = event.target.files[0];
    setAlbum({ ...album, albumposter: file });
  };

  let initialSongData = {
    songName: "",
    songFile: null,
    songThumbnail: null,
    songSingers: "",
    songMood: "",
    songDirector: "",
  };

  let [songs, setSongs] = useState([initialSongData]);

  let addSongs = () => {
    // setSongs([...songs, initialSongData]);
    // the above line is complicated, since it has same ref.
    setSongs([...songs, { ...initialSongData }]);
  };

  let removeSongs = (idx) => {
    let newSongs = songs.filter((value, index) => index !== idx);
    setSongs(newSongs);
  };

  let handleSongChange = (e, index) => {
    // handling an array containing objects
    let value = e.target.value;
    let key = e.target.name;
    // making a new copy, now it there will be 2 diff pointers for those two identifiers..
    let copy = [...songs];
    copy[index][key] = value;
    setSongs(copy);
  };

  let handleSongFileChange = (e, index) => {
    // handling an array containing objects
    let file = e.target.files[0];
    let key = e.target.name;
    // making a new copy, now it there will be 2 diff pointers for those two identifiers..
    let copy = [...songs];
    copy[index][key] = file;
    setSongs(copy);
  };

  let handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    // console.log(album);
    try {
      let albumPosterData = new FormData();
      albumPosterData.append("file", albumposter);
      albumPosterData.append("upload_preset", "music it is");
      let posterResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dhytdvmsm/image/upload",
        {
          method: "POST",
          body: albumPosterData,
        }
      );
      let posterResult = await posterResponse.json();
      // console.log(PosterResult);
      let albumId = posterResult.asset_id;
      let albumPosterURL = posterResult.url;
      let albumData = {
        albumId: albumId,
        albumname: albumname,
        albumposter: albumPosterURL,
        releasedate: releasedate,
        languages: languages,
        albumdescription: albumdescription,
      };
      // console.log(albumData);
      // console.log(songs);
      let songData = [];
      await Promise.all(
        songs.map(async (value, index) => {
          let songThumbnailData = new FormData();
          songThumbnailData.append("file", value.songThumbnail);
          songThumbnailData.append("upload_preset", "music it is");
          let songThumbnailResponse = await fetch(
            "https://api.cloudinary.com/v1_1/dhytdvmsm/image/upload",
            {
              method: "POST",
              body: songThumbnailData,
            }
          );
          let songThumbnailResult = await songThumbnailResponse.json();
          let songThumbnailURL = songThumbnailResult.url;

          let songFileData = new FormData();
          songFileData.append("file", value.songFile);
          songFileData.append("upload_preset", "music it is");
          let songFileResponse = await fetch(
            "https://api.cloudinary.com/v1_1/dhytdvmsm/upload",
            {
              method: "POST",
              body: songFileData,
            }
          );
          // console.log(songFileResult);
          let songFileResult = await songFileResponse.json();
          let songFileURL = songFileResult.url;
          let songFileFormat = songFileResult.format;
          let songFileBytes = songFileResult.bytes;
          let songFileID = songFileResult.asset_id;
          let songFileDuration = songFileResult.duration;
          // console.log(songFileURL, songFileFormat, songFileBytes, songFileID, songFileDuration);

          let songPayload = {
            songID: songFileID,
            songName: value.songName,
            songURL: songFileURL,
            songThumbnailURL: songThumbnailURL,
            songFormat: songFileFormat,
            songBytes: songFileBytes,
            songDuration: songFileDuration,
            songSingers: value.songSingers,
            songMood: value.songMood,
            songDirector: value.songDirector,
          };
          songData.push(songPayload);
        })
      );
      let payload = { ...albumData, songs: songData };
      console.log(payload);
      let album_collection = doc(__DB, "album_collection", albumData.albumId);
      await setDoc(album_collection, payload);
    } catch (e) {
      
    } finally {
      setIsLoading(false);
      setAlbum({
        albumname: "",
        albumposter: null,
        releasedate: "",
        languages: "",
        albumdescription: "",
      });
    }
  };
  return (
    <section className="h-full w-full flex justify-center p-8">
      <article className="bg-gray-900 min-h-[800px] w-[75%] rounded-xl p-4 relative">
        <h2 className="text-center text-xl font-semibold">Add Album</h2>
        <form action="" className="mt-4" onSubmit={handleSubmit}>
          <h3 className="text-xl">Album details</h3>
          <article className="mt-4 flex flex-wrap gap-3">
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="albumname" className="block text-[16px]">
                Album name
              </label>
              <input
                type="text"
                id="albumname"
                placeholder="Enter the album name"
                className="text-black outline-none bg-white rounded-md py-2 px-4"
                required
                name="albumname"
                value={albumname}
                onChange={handleAlbumChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="albumposter" className="block text-[16px]">
                Album Poster
              </label>
              <input
                type="file"
                id="albumposter"
                placeholder="Enter the album name"
                className="text-black outline-none bg-white rounded-md py-2 px-4 file:bg-gray-700 file:px-3 file:rounded-sm file:text-white hover:file:cursor-pointer"
                required
                name="albumposter"
                accept="image/*"
                onChange={handleAlbumPosterChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="releasedate" className="block text-[16px]">
                Release date
              </label>
              <input
                type="date"
                id="releasedate"
                className="text-black outline-none bg-white rounded-md py-2 px-4"
                required
                name="releasedate"
                onChange={handleAlbumChange}
                value={releasedate}
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="languages" className="block text-[16px]">
                Languages
              </label>
              <input
                type="text"
                id="languages"
                placeholder="Enter the languages"
                className="text-black outline-none bg-white rounded-md py-2 px-4"
                required
                name="languages"
                onChange={handleAlbumChange}
                value={languages}
              />
            </div>
            <div className="flex flex-col gap-2 w-[98%]">
              <label htmlFor="albumdescription" className="block text-[16px]">
                Album Description
              </label>
              <textarea
                id="albumdescription"
                className="text-black outline-none bg-white rounded-md py-2 px-4"
                required
                placeholder="Enter the album description"
                name="albumdescription"
                onChange={handleAlbumChange}
                value={albumdescription}
              ></textarea>
            </div>
          </article>
          <h3 className="text-xl mt-4">Song Details</h3>
          <article className="mt-4 flex flex-col gap-4">
            {songs.map((value, idx) => {
              return (
                <section
                  className="bg-gray-700 rounded-md p-4 w-[98%]"
                  key={idx}
                >
                  <h4 className="text-center text-lg">Song {idx + 1}</h4>
                  <main className="flex flex-wrap gap-3">
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label htmlFor="songName" className="block text-[16px]">
                        Song name
                      </label>
                      <input
                        type="text"
                        id="songName"
                        placeholder="Enter the song name"
                        className="text-black outline-none bg-white rounded-md py-2 px-4"
                        required
                        value={value.songName}
                        name="songName"
                        onChange={(e) => {
                          handleSongChange(e, idx);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label htmlFor="songFile" className="block text-[16px]">
                        Song File
                      </label>
                      <input
                        type="file"
                        id="songFile"
                        className="text-black outline-none bg-white rounded-md py-2 px-4 file:bg-gray-700 file:px-3 file:rounded-sm file:text-white hover:file:cursor-pointer"
                        required
                        // do not type value for input type file
                        name="songFile"
                        onChange={(e) => {
                          handleSongFileChange(e, idx);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label
                        htmlFor="songThumbnail"
                        className="block text-[16px]"
                      >
                        Song Thumbnail
                      </label>
                      <input
                        type="file"
                        id="songFile"
                        className="text-black outline-none bg-white rounded-md py-2 px-4 file:bg-gray-700 file:px-3 file:rounded-sm file:text-white hover:file:cursor-pointer"
                        required
                        name="songThumbnail"
                        onChange={(e) => {
                          handleSongFileChange(e, idx);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label
                        htmlFor="songSingers"
                        className="block text-[16px]"
                      >
                        Singers
                      </label>
                      <input
                        type="text"
                        id="songSingers"
                        placeholder="Enter the Singers name"
                        className="text-black outline-none bg-white rounded-md py-2 px-4"
                        required
                        value={value.songSingers}
                        name="songSingers"
                        onChange={(e) => {
                          handleSongChange(e, idx);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label htmlFor="songMood" className="block text-[16px]">
                        Mood
                      </label>
                      <input
                        type="text"
                        id="songMood"
                        placeholder="Enter the Mood of the song"
                        className="text-black outline-none bg-white rounded-md py-2 px-4"
                        required
                        value={value.songMood}
                        name="songMood"
                        onChange={(e) => {
                          handleSongChange(e, idx);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[32%]">
                      <label
                        htmlFor="songDirector"
                        className="block text-[16px]"
                      >
                        Music Director
                      </label>
                      <input
                        type="text"
                        id="songDirector"
                        placeholder="Enter the Director's name"
                        className="text-black outline-none bg-white rounded-md py-2 px-4"
                        required
                        value={value.songDirector}
                        name="songDirector"
                        onChange={(e) => {
                          handleSongChange(e, idx);
                        }}
                      />
                    </div>
                    <div className="flex justify-between w-[100%] font-semibold">
                      {songs.length > 1 && (
                        <div>
                          <input
                            type="button"
                            value="Remove song"
                            className="bg-red-500 rounded-md p-2 hover:cursor-pointer"
                            onClick={() => removeSongs(idx)}
                          />
                        </div>
                      )}
                      {idx === songs.length - 1 && (
                        <div className="ml-auto">
                          <input
                            type="button"
                            value="Add song"
                            className="bg-green-500 rounded-md p-2 hover:cursor-pointer"
                            onClick={addSongs}
                          />
                        </div>
                      )}
                    </div>
                  </main>
                </section>
              );
            })}
          </article>
          <button className="bg-amber-300 p-1.5 rounded-md mt-5 w-[98%] text-black hover:cursor-pointer font-semibold">
            Upload album
          </button>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default AddAlbum;
