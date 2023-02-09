import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import NavBar from '../Pages/Home/NavBar/NavBar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [admin] = useAdmin(user?.email)
    return (
        <div>
            <NavBar></NavBar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80  text-base-content">

                        <li><Link to='/dashboard'>My Appointment</Link></li>
                        {admin && <>
                            <li><Link to='/dashboard/alluser'>All User</Link></li>
                            <li><Link to='/dashboard/adddoctor'>Add A Doctor</Link></li>
                            <li><Link to='/dashboard/managedoctor'>Manage Doctor</Link></li>
                        </>}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;