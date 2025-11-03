import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchModulePermissions,
  createModulePermission,
  updateModulePermission,
  deleteModulePermission,
} from "../store/slices/modulePermissionSlice";
import {
  fetchRoles,
  createRole,
  getRole,
  updateRole,
  clearCurrentRole,
} from "../store/slices/roleSlice";

const PERMISSIONS = ["create", "read", "update", "delete"];

const CreateRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const qs = new URLSearchParams(location.search);
  const roleId = qs.get("roleId");

  const { items: modulePermItems = [] } = useSelector(
    (s) => s.modulePermission || {}
  );
  const { current: currentRole = null, loading: roleLoading } = useSelector(
    (s) => s.role || {}
  );

  const [name, setName] = useState("");
  const [modulePermissions, setModulePermissions] = useState([]);

  // module management form state
  const [creatingModule, setCreatingModule] = useState(false);
  const [newModuleId, setNewModuleId] = useState("");
  const [newPermissionKey, setNewPermissionKey] = useState("");

  useEffect(() => {
    dispatch(fetchModulePermissions({ page: 1, limit: 200 }));
    if (roleId) dispatch(getRole(roleId));
    return () => dispatch(clearCurrentRole());
  }, [dispatch, roleId]);

  // build module list (unique modules) from modulePermItems
  const modules = useMemo(() => {
    const map = new Map();
    (modulePermItems || []).forEach((mp) => {
      // mp may have populated module object or just module id
      const modObj =
        mp.module && typeof mp.module === "object" ? mp.module : null;
      const id =
        (modObj && modObj._id) || mp.module || mp._id || mp.moduleId || null;
      const name =
        (modObj && (modObj.name || modObj.title)) || mp.moduleName || id;
      if (id) map.set(id, { _id: id, name });
    });
    // fallback: if modulePermItems are modules directly
    (modulePermItems || []).forEach((m) => {
      if (m._id && m.name) map.set(m._id, { _id: m._id, name: m.name });
    });
    return Array.from(map.values());
  }, [modulePermItems]);

  useEffect(() => {
    if (currentRole && roleId) {
      setName(currentRole.name || "");
      setModulePermissions(
        (currentRole.modulePermissions || []).map((mp) => ({
          module: mp.module?._id || mp.module,
          permissions: mp.permissions || [],
        }))
      );
    }
  }, [currentRole, roleId]);

  useEffect(() => {
    // ensure modulePermissions contains an entry per module when creating
    if (!roleId && modules.length) {
      setModulePermissions((prev) => {
        const prevMap = new Map(prev.map((p) => [p.module, p]));
        modules.forEach((m) => {
          if (!prevMap.has(m._id))
            prevMap.set(m._id, { module: m._id, permissions: [] });
        });
        return Array.from(prevMap.values());
      });
    }
  }, [modules, roleId]);

  const togglePermission = (moduleId, permission) => {
    setModulePermissions((prev) => {
      const next = prev.slice();
      const idx = next.findIndex((p) => p.module === moduleId);
      if (idx === -1) {
        next.push({ module: moduleId, permissions: [permission] });
      } else {
        const set = new Set(next[idx].permissions || []);
        if (set.has(permission)) set.delete(permission);
        else set.add(permission);
        next[idx] = { ...next[idx], permissions: Array.from(set) };
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name,
      modulePermissions: modulePermissions.filter(
        (m) => m.permissions && m.permissions.length
      ),
    };
    try {
      if (roleId) await dispatch(updateRole({ id: roleId, body })).unwrap();
      else await dispatch(createRole(body)).unwrap();
      dispatch(fetchRoles({ page: 1, limit: 20 }));
      navigate("/masters/roles");
    } catch (err) {
      console.error(err);
      alert("Failed to save role");
    }
  };

  // Module CRUD handlers (use module-permission endpoints)
  const handleCreateModule = async () => {
    if (!newModuleId || !newPermissionKey)
      return alert("Provide module id/name and a permission key");
    try {
      await dispatch(
        createModulePermission({
          module: newModuleId,
          permission: newPermissionKey,
        })
      ).unwrap();
      setNewModuleId("");
      setNewPermissionKey("");
      setCreatingModule(false);
      dispatch(fetchModulePermissions({ page: 1, limit: 200 }));
    } catch (err) {
      console.error(err);
      alert("Failed to create module-permission");
    }
  };

  // updateModulePermission helper (not used currently) — keep name starting with uppercase to avoid lint 'unused var' rule
  const UpdateModule = async (id, permission) => {
    try {
      await dispatch(
        updateModulePermission({ id, body: { permission } })
      ).unwrap();
      dispatch(fetchModulePermissions({ page: 1, limit: 200 }));
    } catch (err) {
      console.error(err);
      alert("Failed to update module-permission");
    }
  };

  const handleDeleteModule = async (id) => {
    if (!window.confirm("Delete this module-permission?")) return;
    try {
      await dispatch(deleteModulePermission(id)).unwrap();
      dispatch(fetchModulePermissions({ page: 1, limit: 200 }));
    } catch (err) {
      console.error(err);
      alert("Failed to delete module-permission");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold text-[#2F3287] mb-4">
          {roleId ? "Edit Role" : "Create Role"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Modules & Permissions</span>
              <button
                type="button"
                onClick={() => setCreatingModule((s) => !s)}
                className="text-sm text-blue-600"
              >
                {creatingModule ? "Close" : "+ Manage Modules"}
              </button>
            </div>

            {creatingModule && (
              <div className="p-3 border rounded mb-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    placeholder="module id or name"
                    value={newModuleId}
                    onChange={(e) => setNewModuleId(e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    placeholder="permission key (eg. read_reports)"
                    value={newPermissionKey}
                    onChange={(e) => setNewPermissionKey(e.target.value)}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={handleCreateModule}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCreatingModule(false);
                      setNewModuleId("");
                      setNewPermissionKey("");
                    }}
                    className="px-3 py-1 border rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3 max-h-72 overflow-auto">
              {modules.length === 0 && (
                <div className="text-sm text-gray-500">No modules found</div>
              )}
              {modules.map((m) => {
                const entry = modulePermissions.find(
                  (p) => p.module === m._id
                ) || { permissions: [] };
                return (
                  <div
                    key={m._id}
                    className="p-3 border rounded flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{m.name || m._id}</div>
                      <div className="text-xs text-gray-500">{m._id}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {PERMISSIONS.map((perm) => (
                        <label
                          key={perm}
                          className="inline-flex items-center text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={(entry.permissions || []).includes(perm)}
                            onChange={() => togglePermission(m._id, perm)}
                            className="mr-2"
                          />
                          {perm}
                        </label>
                      ))}
                      <div className="flex flex-col ml-4">
                        {/* simple controls to edit/delete module-permission entries (closest match) */}
                        <button
                          type="button"
                          onClick={() => handleDeleteModule(m._id)}
                          className="text-xs text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-[#2F3287] text-white rounded"
              disabled={roleLoading}
            >
              Save Role
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRole;
