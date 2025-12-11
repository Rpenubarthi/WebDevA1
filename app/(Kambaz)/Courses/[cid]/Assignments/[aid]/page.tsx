export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
                The assignment is available online Submit a link to the landing page of
            </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" defaultValue={100} />
                    </td>

                </tr>
                <tr>
                    <td>
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group" defaultValue="ASSIGNMENTS">
                            <option value="ASSIGNMENTS">Assignments</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as" defaultValue="Percent">
                            <option value="Percent">Percent</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type" defaultValue="Online">
                            <option value="Online">Online</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>

                    </td>
                    <td>
                        <label>Online Text Entry Options</label><br />

                        <input type="checkbox" name="sub-type" id="wd-text-entry" />
                        <label htmlFor="wd-text-entry">Text Entry</label><br />

                        <input type="checkbox" name="check-url" id="wd-website-url" />
                        <label htmlFor="wd-website-url">Website URL</label><br />

                        <input type="checkbox" name="check-recordings" id="wd-media-recordings" />
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br />

                        <input type="checkbox" name="check-annotations" id="wd-student-annotation" />
                        <label htmlFor="wd-student-annotation">Student Annotations</label><br />

                        <input type="checkbox" name="check-uploads" id="wd-file-upload" />
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>

                </tr>
                <tr>
                    <td>
                    </td>
                    <td>
                        <label htmlFor="wd-assign-to">Assign To</label><br />
                        <input id="wd-assign-to" defaultValue="Everyone" /><br /><br />

                        <label htmlFor="wd-due-date"> Due </label><br />
                        <input type="date"
                            defaultValue="2024-05-13"
                            id="wd-due-date" /><br /><br />

                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <label htmlFor="wd-available-from"> Available From </label><br />
                        <input type="date"
                            defaultValue="2024-05-06"
                            id="wd-available-from" />
                    </td>
                    <td>
                        <label htmlFor="wd-available-until"> Available Until </label><br />
                        <input type="date"
                            defaultValue="2024-05-20"
                            id="wd-available-until" />
                    </td>
                </tr>

            </table>
            <br /> <br />
            <button>Cancel</button>
            <button>Save</button>
        </div>
    );
}

