import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [policies, setPolicies] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    draft: 0,
    strict: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/policies");
      const data = res.data.data.policies;

      setPolicies(data);

      // 🔥 Calculate stats
      const total = data.length;
      const active = data.filter(p => p.status === "active").length;
      const draft = data.filter(p => p.status === "inactive").length;
      const strict = data.filter(p => p.action === "deny").length;

      setStats({ total, active, draft, strict });
    } catch (err) {
      console.error("Error fetching policies", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Privacy & GDPR
          </h1>
          <p className="text-gray-500 text-sm">
            Monitor policy health across your platform
          </p>
        </div>

        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-500 transition">
          + New Policy
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        <Card label="Total Policies" value={stats.total} />

        <Card label="Active" value={stats.active} color="green" sub="enforced now" />

        <Card label="Draft" value={stats.draft} color="orange" sub="pending review" />

        <Card label="Strict Enforcement" value={stats.strict} color="red" sub="critical policies" />

      </div>

      {/* Recent Policies */}
      <div className="space-y-4">
        {policies.slice(0, 3).map(policy => (
          <div
            key={policy._id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <h3 className="text-gray-900 font-semibold mb-1">
              {policy.name}
            </h3>

            <p className="text-gray-500 text-sm">
              {policy.description}
            </p>

            <div className="flex justify-between items-center mt-3">

              <div className="flex items-center gap-2 text-sm">
                <span className="text-purple-600 font-medium">
                  {policy.type.replace("_", " ")}
                </span>

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                  {policy.action}
                </span>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  policy.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {policy.status}
              </span>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;




/* 🔥 Reusable Card Component */
const Card = ({ label, value, color, sub }) => {
  const colorMap = {
    green: "text-green-500",
    orange: "text-orange-500",
    red: "text-red-500",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <p className="text-xs text-gray-400 uppercase">{label}</p>

      <h2 className={`text-3xl font-bold mt-2 ${colorMap[color] || "text-gray-900"}`}>
        {value}
      </h2>

      {sub && <p className="text-sm text-gray-500">{sub}</p>}
    </div>
  );
};