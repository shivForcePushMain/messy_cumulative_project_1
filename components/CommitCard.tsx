import { type CommitObject } from "@/lib/fetchCommits";

export default function CommitCard({ commit }: { commit: CommitObject }) {
    return (
      <div className="group relative flex gap-x-4 pb-8">
        {/* Connector Line */}
        <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-8">
          <div className="w-px bg-gray-200 group-last:bg-transparent" />
        </div>
  
        {/* Dot icon */}
        <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
          <div className="h-2 w-2 rounded-full bg-blue-500 ring-4 ring-white" />
        </div>
  
        <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200 bg-gray-50 hover:bg-white transition-colors">
          <div className="flex justify-between gap-x-4">
            <div className="py-0.5 text-xs leading-5 text-gray-500">
              <span className="font-medium text-gray-900">{commit.author}</span> pushed a commit
            </div>
            <time className="flex-none py-0.5 text-xs leading-5 text-gray-500">
              {new Date(commit.timestamp).toLocaleDateString()}
            </time>
          </div>
          <p className="mt-1 text-sm font-semibold text-gray-800 leading-6">
            {commit.message}
          </p>
          <div className="mt-2 flex gap-2">
              {commit.modified?.slice(0, 3).map((file) => (
                  <span key={file} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      {file.split('/').pop()}
                  </span>
              ))}
          </div>
        </div>
      </div>
    );
  }