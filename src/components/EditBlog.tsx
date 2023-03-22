import 'react-quill/dist/quill.snow.css';

import { useContext } from 'preact/hooks';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router';

import { BlogsAPI } from '../apis';
import { AppState } from '../state';

export const EditBlog = () => {
  const navigate = useNavigate();
  const state = useContext(AppState);

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    if (state.selectedUser.value) {
      await BlogsAPI.saveBlogEntry(
        data.title,
        data.editor,
        state.selectedUser.value.id
      );
      navigate('/');
    }
  };

  return (
    <main>
      <form className="flex flex-col gap-4 w-full mt-8">
        <h1 className="text-4xl">Create Blog Post</h1>
        <input
          className="w-full form-input rounded-md border-gray-300 shadow-sm"
          data-testid="title"
          type="text"
          placeholder="Title"
          {...register('title', {
            required: true,
          })}
        />
        <Controller
          name="editor"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              {...field}
              placeholder={'Enter blog text...'}
              onChange={text => {
                field.onChange(text);
              }}
            />
          )}
        />
        <div className="flex justify-end">
          <button
            className="btn btn-blue"
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            Save
          </button>
        </div>
      </form>
    </main>
  );
};
