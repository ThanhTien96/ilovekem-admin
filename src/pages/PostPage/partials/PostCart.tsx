import { PostType } from '@type/postType';
import clsx from 'clsx';
import { StaticContent } from 'constants/staticContent';
import React from 'react'
import PostAction from './PostAction';
import PostPublic from './PostPublic';

type PostCartProps = {
    className?: string;
    data?: PostType;
    onDelete: (id: string) => void;
    onUpdate: (id: string) => void;
    onPublic: (id: string, isPublic: boolean) => void;
}

const PostCart: React.FC<PostCartProps> = ({className,data, onDelete, onUpdate, onPublic}) => {
    
  return (
    <div className={clsx(className)}>
      <div className="relative flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xxl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg h-full md:w-48 md:rounded-none md:rounded-l-lg"
          src={
            data?.media && Array.isArray(data?.media) && data?.media?.length > 0
              ? data?.media[0].src
              : StaticContent.EMPTY_IMG
          }
          alt="..."
        />

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-md xl:text-lg font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
            {data?.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-4">
            {data?.subContent}
          </p>
          <div className="flex gap-8">
            <span>
              {data?.createdAt}
            </span>
          </div>
        </div>

        {/* action row */}
        <PostAction onUpdate={() => data && onUpdate(data._id)} onDelete={() => data && onDelete(data?._id)} />
        {/* is public status */}
        <PostPublic unPublic={() => data && onPublic(data?._id, false)} onPublic={() => data && onPublic(data?._id, true)} isPublic={data?.isPublic ?? false} />
      </div>
    </div>
  )
}

export default PostCart