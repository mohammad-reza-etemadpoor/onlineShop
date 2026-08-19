"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";

import {
  IoPersonCircleOutline,
  IoPencilOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
} from "react-icons/io5";

import Field from "./Field";

import { updateProfileSchema } from "@src/lib/zodSchemas";
import { updateProfileAction } from "@src/app/actions";

import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function UserInfoCard({
  user,
}) {
  const [editing, setEditing] =
    useState(false);

  const formRef = useRef(null);

  const [birthDate, setBirthDate] =
    useState(
      user?.birthDate
        ? new DateObject(
            user?.birthDate,
          ).convert(persian, persian_fa)
        : null,
    );

  const [lastResult, action, pending] =
    useActionState(
      updateProfileAction,
      undefined,
    );

  const [form, fields] = useForm({
    lastResult: lastResult?.submission,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: updateProfileSchema,
      });
    },

    shouldValidate: "onBlur",

    shouldRevalidate: "onInput",
  });

  // useEffect(() => {
  //   console.log("useEffect", birthDate);
  // }, [birthDate]);

  useEffect(() => {
    // console.log(lastResult);

    if (
      lastResult?.status === "success"
    ) {
      setEditing(false);
    }
  }, [lastResult]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IoPersonCircleOutline
            size={30}
          />

          <h2 className="text-2xl font-semibold mr-4">
            Personal Information
          </h2>
        </div>

        {!editing ? (
          <button
            type="button"
            onClick={() =>
              setEditing(true)
            }
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#F9E34F] px-4 py-2 font-medium"
          >
            <IoPencilOutline />
            Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              form={form.id}
              type="submit"
              disabled={pending}
              className="flex items-center hover:brightness-75 cursor-pointer gap-2 rounded-xl bg-green-500 px-4 py-2 text-white disabled:opacity-60"
            >
              <IoCheckmarkOutline />

              {pending
                ? "Saving..."
                : "Save"}
            </button>

            <button
              type="button"
              onClick={() => {
                formRef?.current?.reset();

                setBirthDate(
                  user?.birthDate
                    ? new DateObject(
                        user.birthDate,
                      ).convert(
                        persian,
                        persian_fa,
                      )
                    : null,
                );
                setEditing(false);
              }}
              className="flex items-center cursor-pointer hover:brightness-75 gap-2 rounded-xl bg-gray-200 px-4 py-2"
            >
              <IoCloseOutline />
              Cancel
            </button>
          </div>
        )}
      </div>

      <form
        ref={formRef}
        id={form.id}
        action={action}
        onSubmit={form.onSubmit}
        noValidate
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Field
            label="First Name"
            field={fields.firstName}
            editing={editing}
            defaultValue={
              user.firstName
            }
          />

          <Field
            label="Last Name"
            field={fields.lastName}
            editing={editing}
            defaultValue={user.lastName}
          />

          <Field
            label="Phone Number"
            editing={false}
            readOnly
            field={{
              id: "phone",
            }}
            defaultValue={user.phone}
          />

          <Field
            label="National ID"
            field={fields.nationalId}
            editing={editing}
            defaultValue={
              user.nationalId
            }
            className="rounded-sm bg-gray-100 px-4 py-3"
          />
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-600">
              Birth Date
            </label>
            <DatePicker
              onChange={(
                dateObject,
              ) => {
                setBirthDate(
                  dateObject,
                );
              }}
              value={birthDate}
              calendar={persian}
              locale={persian_fa}
              inputClass={`rounded-xl w-full px-4 py-3 ${editing ? "border border-gray-300 outline-none transition focus:border-[#F9E34F] " : "bg-gray-100"}`}
              disabled={!editing}
              placeholder="تاریخ تولد را وارد کنید"
            />

            <input
              type="hidden"
              name={
                fields.birthDate.name
              }
              key={fields.birthDate.key}
              value={
                birthDate
                  ? birthDate
                      ?.toDate()
                      .toISOString()
                  : ""
              }
            />
          </div>

          {/* <Field
            label="Birth Date"
            type="date"
            field={fields.birthDate}
            editing={editing}
            defaultValue={
              user.birthDate?.split(
                "T",
              )[0]
            }
          /> */}

          <div>
            <label
              htmlFor={fields.gender.id}
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Gender
            </label>

            {editing ? (
              <>
                <select
                  id={fields.gender.id}
                  name={
                    fields.gender.name
                  }
                  defaultValue={
                    user.gender
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                >
                  <option value="male">
                    Male
                  </option>
                  <option value="female">
                    Female
                  </option>
                </select>

                {fields.gender
                  .errors && (
                  <p className="mt-2 text-sm text-red-500">
                    {
                      fields.gender
                        .errors[0]
                    }
                  </p>
                )}
              </>
            ) : (
              <div className="rounded-xl bg-gray-100 px-4 py-3 capitalize">
                {user.gender}
              </div>
            )}
          </div>

          <Field
            label="Email"
            type="email"
            field={fields.email}
            editing={editing}
            defaultValue={user.email}
          />

          <div className="md:col-span-2">
            <label
              htmlFor={
                fields.address.id
              }
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Address
            </label>

            {editing ? (
              <>
                <textarea
                  id={fields.address.id}
                  name={
                    fields.address.name
                  }
                  rows={4}
                  defaultValue={
                    user.address
                  }
                  className="w-full rounded-xl border border-gray-300 p-4"
                />

                {fields.address
                  .errors && (
                  <p className="mt-2 text-sm text-red-500">
                    {
                      fields.address
                        .errors[0]
                    }
                  </p>
                )}
              </>
            ) : (
              <div className="rounded-xl bg-gray-100 p-4">
                {user.address}
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
