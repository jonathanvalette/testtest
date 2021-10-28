import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { TopBook } from "../../types/TopBook";

interface Props {
  topbook?: TopBook;
}

export const Form: FunctionComponent<Props> = ({ topbook }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(topbook["@id"], { method: "DELETE" });
      router.push("/top_books");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{topbook ? `Edit TopBook ${topbook["@id"]}` : `Create TopBook`}</h1>
      <Formik
        initialValues={topbook ? { ...topbook } : new TopBook()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/top_books" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/top_books");
          } catch (error) {
            setStatus({
              isValid: false,
              msg: `${error.defaultErrorMsg}`,
            });
            setErrors(error.fields);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="_id">
                id
              </label>
              <input
                name="id"
                id="_id"
                value={values.id ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.id && touched.id ? " is-invalid" : ""
                }`}
                aria-invalid={errors.id && touched.id}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="id" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_title">
                title
              </label>
              <input
                name="title"
                id="_title"
                value={values.title ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.title && touched.title ? " is-invalid" : ""
                }`}
                aria-invalid={errors.title && touched.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="title"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_author">
                author
              </label>
              <input
                name="author"
                id="_author"
                value={values.author ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.author && touched.author ? " is-invalid" : ""
                }`}
                aria-invalid={errors.author && touched.author}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="author"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_part">
                part
              </label>
              <input
                name="part"
                id="_part"
                value={values.part ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.part && touched.part ? " is-invalid" : ""
                }`}
                aria-invalid={errors.part && touched.part}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="part" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_place">
                place
              </label>
              <input
                name="place"
                id="_place"
                value={values.place ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.place && touched.place ? " is-invalid" : ""
                }`}
                aria-invalid={errors.place && touched.place}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="place"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_borrowCount">
                borrowCount
              </label>
              <input
                name="borrowCount"
                id="_borrowCount"
                value={values.borrowCount ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.borrowCount && touched.borrowCount ? " is-invalid" : ""
                }`}
                aria-invalid={errors.borrowCount && touched.borrowCount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="borrowCount"
            />

            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/top_books">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {topbook && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
