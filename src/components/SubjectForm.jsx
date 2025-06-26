/*import React, { useState, useEffect } from 'react';
const generateId = () => Date.now() + Math.random();

const SubjectForm = ({ existingSubject = null, onSubmit }) => {
  const [subjects, setSubjects] = useState([
    {
      id: generateId(),
      name: '',
      priority: 'Medium',
      difficulty: 'Medium',
      performance: '',
      studyDuration: '',
      studyTime: 'Morning',
    },
  ]);

  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false); // 🆕 Loading state added

  useEffect(() => {
    if (existingSubject) {
      setSubjects([{ ...existingSubject, id: generateId() }]);
    }
  }, [existingSubject]);

  const handleChange = (id, field, value) => {
    const updatedSubjects = subjects.map((subject) =>
      subject.id === id ? { ...subject, [field]: value } : subject
    );
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: generateId(),
        name: '',
        priority: 'Medium',
        difficulty: 'Medium',
        performance: '',
        studyDuration: '',
        studyTime: 'Morning',
      },
    ]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    setMessage('');
    setSuggestions([]);

    try {
      // 1. Store in database
      const response = await fetch('http://localhost:5000/api/subject/bulk-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjects }),
      });

      if (response.ok) {
        setMessage('Subjects submitted successfully ✅');

        // 2. Fetch suggestions for each subject
        const fetchedSuggestions = await Promise.all(
          subjects.map(async (subject) => {
            const res = await fetch('http://localhost:5000/api/schedule/suggest', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(subject),
            });

            if (!res.ok) return { name: subject.name, error: '❌ Suggestion failed' };

            const data = await res.json();
            return {
              name: subject.name,
              suggestedDuration: data.suggestedDuration || '❌ No suggestion',
              idealSlot: data.idealSlot || 'N/A',
              breakAfter: data.breakAfter || 'N/A',
              focusTip: data.focusTip || 'N/A',
              taskSuggestion: data.taskSuggestion || 'N/A',
            };
          })
        );

        setSuggestions(fetchedSuggestions);

        // 3. Reset form
        setSubjects([
          {
            id: generateId(),
            name: '',
            priority: 'Medium',
            difficulty: 'Medium',
            performance: '',
            studyDuration: '',
            studyTime: 'Morning',
          },
        ]);
      } else {
        setMessage('Failed to submit subjects ❌');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error ❌');
    }
    setLoading(false); // stop loading

    if (onSubmit) onSubmit(subjects);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: `url('https://image.slidesdocs.com/responsive-images/background/soft-blue-3d-calendar-and-alarm-clock-simplify-your-day-to-day-with-an-organizer-and-event-scheduler-powerpoint-background_4df19f44d2__960_540.jpg')`,
      }}
    >
      <form
        onSubmit={handleFormSubmit}
        className="bg-white bg-opacity-90 backdrop-blur max-w-3xl w-full p-6 rounded shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">
          {existingSubject ? 'Edit Subject' : 'Add Subjects'}
        </h2>

        {message && (
          <div
            className={`mb-4 text-sm font-medium ${
              message.includes('❌') ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {message}
          </div>
        )}

        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="mb-4 border p-4 rounded bg-white bg-opacity-80"
          >
            <input
              type="text"
              placeholder="Subject Name"
              value={subject.name}
              onChange={(e) => handleChange(subject.id, 'name', e.target.value)}
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <div className="flex space-x-4 mb-2">
              <select
                value={subject.priority}
                onChange={(e) => handleChange(subject.id, 'priority', e.target.value)}
                className="p-2 border rounded"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
              <select
                value={subject.difficulty}
                onChange={(e) => handleChange(subject.id, 'difficulty', e.target.value)}
                className="p-2 border rounded"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <input
                type="number"
                placeholder="Performance %"
                value={subject.performance}
                onChange={(e) => handleChange(subject.id, 'performance', e.target.value)}
                className="p-2 border rounded w-32"
                required
                min="0"
                max="100"
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Study Duration (min)"
                value={subject.studyDuration}
                onChange={(e) => handleChange(subject.id, 'studyDuration', e.target.value)}
                className="p-2 border rounded w-48"
                required
                min="1"
              />
              <select
                value={subject.studyTime}
                onChange={(e) => handleChange(subject.id, 'studyTime', e.target.value)}
                className="p-2 border rounded"
                required
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>
        ))}

        {!existingSubject && (
          <button
            type="button"
            onClick={addSubject}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
            disabled={loading} // disable while loading
          >
            + Add Another Subject
          </button>
        )}

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={loading} // disable while loading
        >
          {loading ? 'Submitting...' : existingSubject ? 'Update Subject' : 'Submit'}
        </button>

        {suggestions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">💡 Smart Study Suggestions:</h3>
            {suggestions.map((s, i) => (
              <div key={i} className="mb-4 p-4 border rounded bg-gray-50 shadow">
                <p>
                  <strong>📘 Subject:</strong> {s.name}
                </p>
                {s.error ? (
                  <p className="text-red-500">{s.error}</p>
                ) : (
                  <>
                    <p>
                      <strong>⏳ Suggested Duration:</strong> {s.suggestedDuration} minutes
                    </p>
                    <p>
                      <strong>🕒 Ideal Slot:</strong> {s.idealSlot}
                    </p>
                    <p>
                      <strong>🍵 Break Suggestion:</strong> {s.breakAfter}
                    </p>
                    <p>
                      <strong>🎯 Focus Tip:</strong> {s.focusTip}
                    </p>
                    <p>
                      <strong>📝 Task Suggestion:</strong> {s.taskSuggestion}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SubjectForm;
*/




/*
import React, { useState, useEffect } from 'react';
const generateId = () => Date.now() + Math.random();

const SubjectForm = ({ existingSubject = null, onSubmit }) => {
  const [subjects, setSubjects] = useState([
    {
      id: generateId(),
      name: '',
      priority: 'Medium',
      difficulty: 'Medium',
      performance: '',
      studyDuration: '',
      studyTime: 'Morning',
    },
  ]);

  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingSubject) {
      setSubjects([{ ...existingSubject, id: generateId() }]);
    }
  }, [existingSubject]);

  const handleChange = (id, field, value) => {
    const updatedSubjects = subjects.map((subject) =>
      subject.id === id ? { ...subject, [field]: value } : subject
    );
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: generateId(),
        name: '',
        priority: 'Medium',
        difficulty: 'Medium',
        performance: '',
        studyDuration: '',
        studyTime: 'Morning',
      },
    ]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuggestions([]);

    try {
      const response = await fetch('http://localhost:5000/api/subject/bulk-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjects }),
      });

/*
try {
  const timestampedSubjects = subjects.map((subject) => ({
    ...subject,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const response = await fetch('http://localhost:5000/api/subject/bulk-add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subjects: timestampedSubjects }),
  });
*/
  // ... rest of your logic
/*
      if (response.ok) {
        setMessage('Subjects submitted successfully ✅');

        const fetchedSuggestions = await Promise.all(
          subjects.map(async (subject) => {
            const res = await fetch('http://localhost:5000/api/schedule/suggest', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(subject),
            });

            if (!res.ok) return { name: subject.name, error: '❌ Suggestion failed' };

            const data = await res.json();
            return {
              name: subject.name,
              suggestedDuration: data.suggestedDuration || '❌ No suggestion',
              idealSlot: data.idealSlot || 'N/A',
              breakAfter: data.breakAfter || 'N/A',
              focusTip: data.focusTip || 'N/A',
              taskSuggestion: data.taskSuggestion || 'N/A',
            };
          })
        );

        setSuggestions(fetchedSuggestions);

        setSubjects([
          {
            id: generateId(),
            name: '',
            priority: 'Medium',
            difficulty: 'Medium',
            performance: '',
            studyDuration: '',
            studyTime: 'Morning',
          },
        ]);
      } else {
        setMessage('Failed to submit subjects ❌');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error ❌');
    }
    setLoading(false);

    if (onSubmit) onSubmit(subjects);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 transition-all duration-500">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md max-w-3xl w-full p-8 rounded-xl shadow-2xl animate-fade-in"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800 dark:text-blue-200">
          {existingSubject ? 'Edit Subject' : '📘 Add Your Study Subjects'}
        </h2>

        {message && (
          <div
            className={`mb-4 text-sm font-semibold text-center ${
              message.includes('❌') ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {message}
          </div>
        )}

        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="mb-6 border-l-4 border-blue-400 p-4 rounded bg-white dark:bg-gray-700 shadow-md transition-transform hover:scale-[1.01]"
          >
            <input
              type="text"
              placeholder="Subject Name"
              value={subject.name}
              onChange={(e) => handleChange(subject.id, 'name', e.target.value)}
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            <div className="flex flex-wrap gap-4 mb-3">
              <select
                value={subject.priority}
                onChange={(e) => handleChange(subject.id, 'priority', e.target.value)}
                className="p-3 border rounded-lg"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
              <select
                value={subject.difficulty}
                onChange={(e) => handleChange(subject.id, 'difficulty', e.target.value)}
                className="p-3 border rounded-lg"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <input
                type="number"
                placeholder="Performance %"
                value={subject.performance}
                onChange={(e) => handleChange(subject.id, 'performance', e.target.value)}
                className="p-3 border rounded-lg w-32"
                required
                min="0"
                max="100"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <input
                type="number"
                placeholder="Study Duration (min)"
                value={subject.studyDuration}
                onChange={(e) => handleChange(subject.id, 'studyDuration', e.target.value)}
                className="p-3 border rounded-lg w-48"
                required
                min="1"
              />
              <select
                value={subject.studyTime}
                onChange={(e) => handleChange(subject.id, 'studyTime', e.target.value)}
                className="p-3 border rounded-lg"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>
        ))}

        {!existingSubject && (
          <button
            type="button"
            onClick={addSubject}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg mr-4 transition-transform active:scale-95"
            disabled={loading}
          >
            + Add Another Subject
          </button>
        )}

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-transform active:scale-95"
          disabled={loading}
        >
          {loading ? 'Submitting...' : existingSubject ? 'Update Subject' : 'Submit'}
        </button>

        {suggestions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-200">💡 Smart Study Suggestions:</h3>
            {suggestions.map((s, i) => (
              <div key={i} className="mb-4 p-4 border-l-4 border-green-400 bg-green-50 dark:bg-gray-600 rounded shadow">
                <p><strong>📘 Subject:</strong> {s.name}</p>
                {s.error ? (
                  <p className="text-red-500">{s.error}</p>
                ) : (
                  <>
                    <p><strong>⏳ Suggested Duration:</strong> {s.suggestedDuration} minutes</p>
                    <p><strong>🕒 Ideal Slot:</strong> {s.idealSlot}</p>
                    <p><strong>🍵 Break Suggestion:</strong> {s.breakAfter}</p>
                    <p><strong>🎯 Focus Tip:</strong> {s.focusTip}</p>
                    <p><strong>📝 Task Suggestion:</strong> {s.taskSuggestion}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SubjectForm;
*/
import React, { useState, useEffect } from 'react';
const generateId = () => Date.now() + Math.random();

const SubjectForm = ({ existingSubject = null, onSubmit }) => {
  const [subjects, setSubjects] = useState([
    {
      id: generateId(),
      name: '',
      priority: '',
      difficulty: '',
      performance: '',
      studyDuration: '',
      studyTime: '',
    },
  ]);

  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingSubject) {
      setSubjects([{ ...existingSubject, id: generateId() }]);
    }
  }, [existingSubject]);

  const handleChange = (id, field, value) => {
    const updatedSubjects = subjects.map((subject) =>
      subject.id === id ? { ...subject, [field]: value } : subject
    );
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: generateId(),
        name: '',
        priority: '',
        difficulty: '',
        performance: '',
        studyDuration: '',
        studyTime: '',
      },
    ]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuggestions([]);

    try {
      const response = await fetch('http://localhost:5000/api/subject/bulk-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjects }),
      });

      if (response.ok) {
        setMessage('Subjects submitted successfully ✅');

        const fetchedSuggestions = await Promise.all(
          subjects.map(async (subject) => {
            const res = await fetch('http://localhost:5000/api/schedule/suggest', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(subject),
            });

            if (!res.ok) return { name: subject.name, error: '❌ Suggestion failed' };

            const data = await res.json();
            return {
              name: subject.name,
              suggestedDuration: data.suggestedDuration || '❌ No suggestion',
              idealSlot: data.idealSlot || 'N/A',
              breakAfter: data.breakAfter || 'N/A',
              focusTip: data.focusTip || 'N/A',
              taskSuggestion: data.taskSuggestion || 'N/A',
            };
          })
        );

        setSuggestions(fetchedSuggestions);

        setSubjects([
          {
            id: generateId(),
            name: '',
            priority: 'Medium',
            difficulty: 'Medium',
            performance: '',
            studyDuration: '',
            studyTime: 'Morning',
          },
        ]);
      } else {
        setMessage('Failed to submit subjects ❌');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error ❌');
    }
    setLoading(false);

    if (onSubmit) onSubmit(subjects);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 transition-all duration-500">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md max-w-3xl w-full p-8 rounded-xl shadow-2xl animate-fade-in"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800 dark:text-blue-200">
          {existingSubject ? 'Edit Subject' : '📘 Add Your Study Subjects'}
        </h2>

        {message && (
          <div
            className={`mb-4 text-sm font-semibold text-center ${
              message.includes('❌') ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {message}
          </div>
        )}
     
        {subjects.map((subject) => (
  <div
    key={subject.id}
    className="mb-6 border-l-4 border-blue-400 p-4 rounded bg-white dark:bg-gray-700 shadow-md transition-transform hover:scale-[1.01]"
  >
    {/* Subject Name */}
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      Subject Name
    </label>
    <input
      type="text"
      placeholder="Subject Name"
      value={subject.name}
      onChange={(e) => handleChange(subject.id, 'name', e.target.value)}
      className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
      required
    />

    <div className="flex flex-wrap gap-4 mb-3">
      {/* Priority */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Priority
        </label>
        <select
          value={subject.priority}
          onChange={(e) => handleChange(subject.id, 'priority', e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Difficulty
        </label>
        <select
          value={subject.difficulty}
          onChange={(e) => handleChange(subject.id, 'difficulty', e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Performance */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Performance (%)
        </label>
        <input
          type="number"
          placeholder="Performance %"
          value={subject.performance}
          onChange={(e) => handleChange(subject.id, 'performance', e.target.value)}
          className="p-3 border rounded-lg w-32"
          required
          min="0"
          max="100"
        />
      </div>
    </div>

    <div className="flex flex-wrap gap-4">
      {/* Study Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Study Duration (min)
        </label>
        <input
          type="number"
          placeholder="Study Duration"
          value={subject.studyDuration}
          onChange={(e) => handleChange(subject.id, 'studyDuration', e.target.value)}
          className="p-3 border rounded-lg w-48"
          required
          min="1"
        />
      </div>

      {/* Study Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Preferred Study Time
        </label>
        <select
          value={subject.studyTime}
          onChange={(e) => handleChange(subject.id, 'studyTime', e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
          
        </select>
      </div>
    </div>
  </div>
))}

        {!existingSubject && (
          <button
            type="button"
            onClick={addSubject}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg mr-4 transition-transform active:scale-95"
            disabled={loading}
          >
            + Add Another Subject
          </button>
        )}

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-transform active:scale-95"
          disabled={loading}
        >
          {loading ? 'Submitting...' : existingSubject ? 'Update Subject' : 'Submit'}
        </button>

        {suggestions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-200">💡 Smart Study Suggestions:</h3>
            {suggestions.map((s, i) => (
              <div key={i} className="mb-4 p-4 border-l-4 border-green-400 bg-green-50 dark:bg-gray-600 rounded shadow">
                <p><strong>📘 Subject:</strong> {s.name}</p>
                {s.error ? (
                  <p className="text-red-500">{s.error}</p>
                ) : (
                  <>
                    <p><strong>⏳ Suggested Duration:</strong> {s.suggestedDuration} minutes</p>
                    <p><strong>🕒 Ideal Slot:</strong> {s.idealSlot}</p>
                    <p><strong>🍵 Break Suggestion:</strong> {s.breakAfter}</p>
                    <p><strong>🎯 Focus Tip:</strong> {s.focusTip}</p>
                    <p><strong>📝 Task Suggestion:</strong> {s.taskSuggestion}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SubjectForm;  