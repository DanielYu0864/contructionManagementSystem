import { useEffect, useRef, useState } from "react";
import { ProjectAPI } from "../../api";

function ProjectForm({ project, hasAuthority }) {

    const [projectState, setProjectState] = useState(project.status);

    useEffect(() => {
        setProjectState(project.status);
    }, [project]);

    const nameRef = useRef(null);
    const startDateRef = useRef(null);
    const deadlineRef = useRef(null);
    const roomTypeRef = useRef(null);
    const laborBudgetRef = useRef(null);
    const materialBudgetRef = useRef(null);
    const totalBudgetRef = useRef(null);
    const isPlumbingRef = useRef(null);
    const isElectricRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedProjectInformation = {
            id: project.id,
            name: nameRef.current.value,
            status: projectState,
            startDate: startDateRef.current.value,
            deadline: deadlineRef.current.value,
            roomType: roomTypeRef.current.value,
            laborBudget: laborBudgetRef.current.value,
            materialBudget: materialBudgetRef.current.value,
            totalBudget: totalBudgetRef.current.value,
            plumbing: isPlumbingRef.current.checked,
            electric: isElectricRef.current.checked,
        };
        ProjectAPI.putProject(updatedProjectInformation);
    };

    return (
        <div>
            <form style={{ margin: "0 auto" }} onSubmit={handleSubmit}>
                <fieldset>
                    <div className="form-group">
                        <label
                            for="projectTitle"
                            className="form-label mt-4 ms-4 d-flex align-items-start"
                        >
                            Project Id #{project.id}
                        </label>
                        <input
                            className="form-control ms-4"
                            id="projectTitle"
                            defaultValue={project.name}
                            readOnly={!hasAuthority}
                            ref={nameRef}
                        />
                    </div>
                    <div className="form-group">
                        <label
                            for="status"
                            className="form-label mt-4 ms-4 d-flex align-items-start"
                        >
                            Status
                        </label>
                        <select
                            class="form-select ms-4"
                            id="status"
                            disabled={!hasAuthority}
                            value={projectState}
                            onChange={(event) => setProjectState(event.target.value)}
                        >
                            <option value="in_progress" >In Progress</option>
                            <option value="completed" >Completed</option>
                            <option value="cancelled" >Cancelled</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <div class="form-group row">
                            <label for="startDate" class="col-sm-2 col-form-label">
                                Start Date
                            </label>
                            <div class="col-sm-4">
                                <input
                                    type="date"
                                    readOnly={!hasAuthority}
                                    class="form-control-plaintext"
                                    id="startDate"
                                    defaultValue={project.startDate}
                                    ref={startDateRef}
                                />
                            </div>
                            <label for="deadline" class="col-sm-2 col-form-label">
                                Deadline
                            </label>
                            <div class="col-sm-4">
                                <input
                                    type="date"
                                    readOnly={!hasAuthority}
                                    class="form-control-plaintext"
                                    id="deadline"
                                    defaultValue={project.deadline}
                                    ref={deadlineRef}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            for="roomType"
                            className="form-label mt-4 ms-4 d-flex align-items-start"
                        >
                            Room Type
                        </label>
                        <input
                            className="form-control ms-4"
                            id="roomType"
                            defaultValue={project.roomType}
                            readOnly={!hasAuthority}
                            ref={roomTypeRef}
                        />
                    </div>
                    <div className="form-group" id="budgetsFormGroup">
                        <div class="form-group row">
                            <label for="laborBudget" class="col-lg-1 col-form-label">
                                Labor Budget
                            </label>
                            <div className="col-lg-3" style={{ display: "inline" }}>
                                <span class="input-group-text" style={{ display: "inline" }}>
                                    $
                                </span>
                                <input
                                    type="number"
                                    readOnly={!hasAuthority}
                                    class="form-control-plaintext"
                                    style={{ display: "inline", width: "20%" }}
                                    id="laborBudget"
                                    defaultValue={project.laborBudget}
                                    ref={laborBudgetRef}
                                />
                            </div>
                            <label for="laborBudget" class="col-lg-1 col-form-label">
                                Material Budget
                            </label>
                            <div className="col-lg-3" style={{ display: "inline" }}>
                                <span class="input-group-text" style={{ display: "inline" }}>
                                    $
                                </span>
                                <input
                                    type="number"
                                    readOnly={!hasAuthority}
                                    class="form-control-plaintext"
                                    style={{ display: "inline", width: "20%" }}
                                    id="materialBudget"
                                    defaultValue={project.materialBudget}
                                    ref={materialBudgetRef}
                                />
                            </div>
                            <label for="laborBudget" class="col-lg-1 col-form-label">
                                Total Budget
                            </label>
                            <div className="col-lg-3" style={{ display: "inline" }}>
                                <span class="input-group-text" style={{ display: "inline" }}>
                                    $
                                </span>
                                <input
                                    type="number"
                                    readOnly={!hasAuthority}
                                    class="form-control-plaintext"
                                    style={{ display: "inline", width: "20%" }}
                                    id="totalBudget"
                                    defaultValue={project.totalBudget}
                                    ref={totalBudgetRef}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="form-check form-switch text-start">
                        <label class="form-check-label " for="isPlumbing">
                            Has Plumbing
                        </label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="isPlumbing"
                            defaultChecked={project.plumbing}
                            ref={isPlumbingRef}
                            disabled={!hasAuthority}
                        />
                    </div>
                    <div class="form-check form-switch text-start">
                        <label className="form-check-label " for="isElectric">
                            Has Electric
                        </label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="isElectric"
                            defaultChecked={project.electric}
                            ref={isElectricRef}
                            disabled={!hasAuthority}
                        />
                    </div>
                </fieldset>
                <button className="btn btn-info" type="submit" disabled={!hasAuthority}>
                    Apply Changes
                </button>
            </form>
        </div>
    )
}

export default ProjectForm