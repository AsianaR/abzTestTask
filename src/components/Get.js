import { useEffect, useState } from "react";
import useApi from "../services/ApiService";
import avatarHolder from '../Assets/photo-cover.svg'
import { ClipLoader } from "react-spinners";
import "../styles/Get.sass";

const Get = () => {
  const { loading, error, getUsers } = useApi();
  const [data, setData] = useState([]);
  const [link, setLink] = useState(null);
  
  useEffect(() => {
    request();
  }, []);

  const request = (url) => {
    getUsers(url).then((values) => {
      setData([...data, ...values.users])
      setLink(values.links.next_url);
    });
  };
  return (
    <article className="get-block">
          <h1>Working with GET request</h1>

        <section className="container__get" id="users">
        { loading ? <ClipLoader color="#00BDD3" size={100}/> : null}
        {data?.map((item) => {
          return (
            <>
              <div className="card" key={item?.id} style={loading ? {display: "none"} : null}>
                <img src={item?.photo ?? avatarHolder } className="card__image" alt="avatar" />
                <p className="card__name">{item?.name}</p>
                <p className="card__text">{item?.position}</p>
                <p>{item?.email}</p>
                <p>{item?.phone}</p>
              </div>
            </>
          );
        })}
        {link ? <button className="button" onClick={() => request(link)}>Show more</button> : null}
    </section>
      </article>
  );
};

export default Get;
