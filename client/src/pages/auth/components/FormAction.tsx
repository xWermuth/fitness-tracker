import React from 'react';

interface FormActionProps {
  handleSubmit(e: React.FormEvent<HTMLButtonElement>): void;
  type?: 'submit' | 'reset' | 'button';
  action?: 'submit' | 'reset' | 'button';
  text: string;
  loading: boolean;
}

const FormAction: React.FC<FormActionProps> = ({ handleSubmit, type = 'Button', loading, action = 'submit', text }) => {
  return (
    <>
      {type === 'Button' ? (
        <button
          type={action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onSubmit={handleSubmit}
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {loading ? 'Loading...' : text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default FormAction;
