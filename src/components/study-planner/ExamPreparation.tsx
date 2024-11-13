import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface ExamData {
  id: string;
  title: string;
  created_by: string;
  created_at: string;
  modified_by: string;
  modified_at: string;
  start_date: string;
  end_date: string;
  meta_data: {
    subjects: string[];
    topics?: string[];
    chapters?: string[];
  };
}

interface ExamFormData {
  title: string;
  examDate: string;
  subjects: string[];
}

const subjectOptions = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Literature',
  'History',
  'Geography',
];

export default function ExamPreparationView() {
  const [exams, setExams] = useState<ExamData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ExamFormData>({
    //@ts-ignore
    // resolver: yupResolver(schema)
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      // Simulated API call with dummy data
      const dummyData: ExamData[] = [
        {
          id: '79d53f56-1359-473b-845a-e67a836f83a7',
          title: 'Science Final Exam',
          created_by: 'a322ffcd-0253-4162-acdd-754051d38312',
          created_at: '2024-11-11T07:52:04.615Z',
          modified_by: 'a322ffcd-0253-4162-acdd-754051d38312',
          modified_at: '2024-11-11T07:52:04.615Z',
          start_date: '2024-11-26T18:30:00.000Z',
          end_date: '2024-11-26T21:30:00.000Z',
          meta_data: {
            subjects: ['Chemistry', 'Physics'],
            topics: ['Chemical Reactions', 'Thermodynamics'],
            chapters: ['Chapter 5: Periodic Table', 'Chapter 8: Heat Transfer'],
          },
        },
        {
          id: '89d53f56-1359-473b-845a-e67a836f83a8',
          title: 'Mathematics Midterm',
          created_by: 'a322ffcd-0253-4162-acdd-754051d38312',
          created_at: '2024-11-11T07:52:04.615Z',
          modified_by: 'a322ffcd-0253-4162-acdd-754051d38312',
          modified_at: '2024-11-11T07:52:04.615Z',
          start_date: '2024-11-19T18:30:00.000Z',
          end_date: '2024-11-19T20:30:00.000Z',
          meta_data: {
            subjects: ['Algebra', 'Geometry'],
            topics: ['Quadratic Equations', 'Triangles'],
            chapters: ['Chapter 3: Functions', 'Chapter 4: Polygons'],
          },
        },
      ];
      setExams(dummyData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exams:', error);
      setLoading(false);
    }
  };

  const getCardGradient = (index: number) => {
    const gradients = [
      'from-purple-400 to-pink-600',
      'from-blue-400 to-teal-600',
      'from-green-400 to-cyan-600',
      'from-yellow-400 to-orange-600',
    ];
    return gradients[index % gradients.length];
  };

  const getDummyProgress = (examId: string) => {
    const progressMap: { [key: string]: number } = {
      '79d53f56-1359-473b-845a-e67a836f83a7': 65,
      '89d53f56-1359-473b-845a-e67a836f83a8': 80,
    };
    return progressMap[examId] || 0;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDistanceToNow = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(date.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `in ${diffDays} days`;
  };

  const onSubmit = (data: ExamFormData) => {
    const today = new Date().toISOString().split('T')[0];
    const requestBody = {
      title: data.title,
      start_date: today,
      end_date: data.examDate,
      meta_data: {
        subjects: data.subjects,
      },
    };
    console.log('Submitting new exam plan:', requestBody);
    // Here you would typically make an API call to create the new exam plan
    // For now, we'll just close the modal and reset the form
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Exam Preparation
            </h1>
            <p className="text-gray-400">
              Create a focused study plan for your upcoming exams
            </p>
          </div>
          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="mr-2">+</span>
            Add New Exam Plan
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {exams.map((exam, index) => (
            <div
              key={exam.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div className={`p-1 bg-gradient-to-r ${getCardGradient(index)}`}>
                <div className="bg-gray-800 p-5 rounded-t-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2
                        className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${getCardGradient(index)}`}
                      >
                        {exam.title}
                      </h2>
                      <p className="text-sm text-gray-400">
                        {formatDistanceToNow(exam.start_date)}
                      </p>
                    </div>
                    <div className="text-sm text-gray-400">
                      <div className="flex items-center">
                        <span className="mr-1">📅</span>
                        <span>{formatDate(exam.start_date)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">🕒</span>
                        <span>{formatTime(exam.start_date)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Preparation Progress</span>
                        <span>{getDummyProgress(exam.id)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${getCardGradient(index)}`}
                          style={{ width: `${getDummyProgress(exam.id)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2 text-gray-300">
                        Focus Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exam.meta_data.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    {exam.meta_data.chapters && (
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-gray-300">
                          Chapters
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exam.meta_data.chapters.map((chapter) => (
                            <span
                              key={chapter}
                              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300"
                            >
                              {chapter}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {exam.meta_data.topics && (
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-gray-300">
                          Topics
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exam.meta_data.topics.map((topic) => (
                            <span
                              key={topic}
                              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700/30 text-gray-300"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-800">
                <button
                  className={`w-full px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r ${getCardGradient(index)} hover:opacity-90 transition-opacity duration-300`}
                >
                  View Detailed Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding new exam plan */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Add New Exam Plan
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Exam Title
                </label>
                <input
                  {...register('title')}
                  id="title"
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter exam title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="examDate"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Exam Date
                </label>
                <input
                  {...register('examDate')}
                  id="examDate"
                  type="date"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.examDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.examDate.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subjects"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Subjects
                </label>
                <Controller
                  name="subjects"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <div className="space-y-2">
                      {subjectOptions.map((subject) => (
                        <label
                          key={subject}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={subject}
                            checked={field.value.includes(subject)}
                            onChange={(e) => {
                              const updatedSubjects = e.target.checked
                                ? [...field.value, subject]
                                : field.value.filter(
                                    (s: string) => s !== subject
                                  );
                              field.onChange(updatedSubjects);
                            }}
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                          />
                          <span className="text-gray-300">{subject}</span>
                        </label>
                      ))}
                    </div>
                  )}
                />
                {errors.subjects && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.subjects.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Add Exam Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
