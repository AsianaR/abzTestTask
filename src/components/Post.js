import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import useApi from "../services/ApiService";
import * as Yup from "yup";
import "../styles/variables.sass";
import "../styles/Post.sass";
import successImage from "../Assets/success-image.svg";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg"];
const FILE_SIZE = 5 * 1024;
const phoneRegExp = /^[+]*[380][0-9]{11,11}$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid (+380000000000)")
    .required("Required"),
  position_id: Yup.number().required("Required"),
  photo: Yup.mixed()
    // .test(
    //   "fileSize",
    //   "File Size is too large",
    //   (value) => value.size <= FILE_SIZE
    // )
    // .test("fileType", "Unsupported File Format", (value) =>
    //   SUPPORTED_FORMATS.includes(value.type)
    // )
    .required("Required"),
});

const Post = () => {
  const { getToken, getPositions, postUser } = useApi();
  const [data, setData] = useState();
  const [token, setToken] = useState();
  const [photo, setPhoto] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    getPositions().then((values) => setData(values.positions));
    getToken().then((values) => setToken(values.token));
  }, []);

  return (
    <article className="post-block">
      <h1>Working with POST request</h1>
      <div className="container__post" id="signUp">
        <img
          src={successImage}
          style={isSuccess ? null : { display: "none" }}
          className="successImage"
          alt="success"
        />
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            position_id: "",
            photo: null,
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            postUser({ ...values, photo }, token, setIsSuccess);
          }}
        >
          {({ errors, touched }) => (
            <Form
              className="form"
              style={isSuccess ? { display: "none" } : null}
            >
              <Field
                id="name"
                name="name"
                placeholder="Your name"
                className={`form__field ${
                  errors.name && touched.name ? "form__field_error" : null
                }`}
              />
              {errors.name && touched.name ? (
                <div className="error">{errors?.name}</div>
              ) : null}

              <Field
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                className={`form__field ${
                  errors.email && touched.email ? "form__field_error" : null
                }`}
              />
              {errors.email && touched.email ? (
                <div className="error">{errors?.email}</div>
              ) : null}

              <Field
                id="phone"
                name="phone"
                placeholder="Phone"
                className={`form__field ${
                  errors.phone && touched.phone ? "form__field_error" : null
                }`}
              />
              {errors.phone && touched.phone ? (
                <div className="error">{errors?.phone}</div>
              ) : null}

              <div
                role="group"
                aria-labelledby="my-radio-group"
                className="form__radio"
              >
                <label className="form__radio__label">
                  Select your position
                </label>
                {data?.map((item) => {
                  return (
                    <label className="form__radio__wrapper">
                      <Field
                        type="radio"
                        name="position_id"
                        id={item?.id}
                        value={item?.id}
                        className="form__radio__item"
                      />
                      <div className="form__radio__item__text">
                        {item?.name}
                      </div>
                    </label>
                  );
                })}
              </div>
              <div className="form__file">
                <input
                  id="file"
                  name="photo"
                  type="file"
                  className="form__file__input"
                  onChange={(e) => setPhoto(e.currentTarget.files[0])}
                />
                <div
                  className={`form__file__text ${errors.photo && touched.photo ? "form__file__text_error" : null}`}
                >
                  <label for="file" className={`form__file__label ${errors.photo && touched.photo ? "form__file__label_error" : null}`}>
                    Upload
                  </label>
                  <label style={{ marginLeft: "16px" }}>
                    {photo !== null ? photo?.name : "Upload your photo"}
                  </label>
                </div>
                  {errors.photo && touched.photo ? (
                    <div className="error">{errors?.photo}</div>
                  ) : null}
              </div>
              <button type="submit" className="button button_pos_center">
                Sign up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </article>
  );
};

export default Post;
