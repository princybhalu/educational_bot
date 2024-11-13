import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface ExamData {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  meta_data: {
    subjects: string[];
    topics?: string[];
    chapters?: string[];
    progress?: number;
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

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyle =
    'px-4 py-2 rounded-lg font-medium transition-all duration-300 ';
  const variants = {
    primary:
      'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-800 text-white',
    outline:
      'border-2 border-purple-500 text-purple-500 hover:bg-purple-500/10',
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  gradient = '',
}) => (
  <div
    className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${className}`}
  >
    <div className={`p-1 bg-gradient-to-r ${gradient}`}>
      <div className="bg-gray-800 rounded-t-xl">{children}</div>
    </div>
  </div>
);

export default function ExamPreparationView() {
  const [exams, setExams] = useState<ExamData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, control, reset } = useForm<ExamFormData>();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const dummyData: ExamData[] = [
      {
        id: '1',
        title: 'Science Final Exam',
        start_date: '2024-11-26T18:30:00.000Z',
        end_date: '2024-11-26T21:30:00.000Z',
        meta_data: {
          subjects: ['Chemistry', 'Physics'],
          topics: ['Chemical Reactions', 'Thermodynamics'],
          chapters: ['Chapter 5: Periodic Table', 'Chapter 8: Heat Transfer'],
          progress: 65,
        },
      },
      {
        id: '2',
        title: 'Mathematics Midterm',
        start_date: '2024-11-19T18:30:00.000Z',
        end_date: '2024-11-19T20:30:00.000Z',
        meta_data: {
          subjects: ['Mathematics'],
          topics: ['Calculus', 'Linear Algebra'],
          chapters: ['Chapter 3: Derivatives', 'Chapter 4: Matrices'],
          progress: 80,
        },
      },
    ];
    setExams(dummyData);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTimeRemaining = (dateString: string) => {
    const diff = new Date(dateString).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days} days remaining`;
  };

  const onSubmit = (data: ExamFormData) => {
    console.log('Form submitted:', data);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Exam Preparation
            </h1>
            <p className="text-gray-400 mt-1">
              Track and manage your upcoming exams
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>Add New Exam</Button>
        </div>

        {/* Exam Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam, index) => (
            <Card key={exam.id} gradient={getCardGradient(index)}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2
                    className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${getCardGradient(index)}`}
                  >
                    {exam.title}
                  </h2>
                  <span className="px-3 py-1 bg-gray-700 text-gray-100 text-sm rounded-full">
                    {getTimeRemaining(exam.start_date)}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <span className="mr-2">📅</span>
                    {formatDate(exam.start_date)}
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Progress</span>
                      <span className="text-gray-300">
                        {exam.meta_data.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${getCardGradient(index)}`}
                        style={{ width: `${exam.meta_data.progress}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">
                      Subjects
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {exam.meta_data.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {exam.meta_data.topics && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-300 mb-2">
                        Topics
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {exam.meta_data.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => console.log('View details:', exam.id)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Exam Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Add New Exam
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Exam Title
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter exam title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Exam Date
                  </label>
                  <input
                    {...register('examDate')}
                    type="date"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
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
                              className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                            />
                            <span className="text-gray-300">{subject}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Exam</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
