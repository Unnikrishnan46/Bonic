import React from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'

function AdminMain({handleToggleClick}) {
    
    return (
        <div className='main-content'>
            <AdminHeader handleToggleClick={handleToggleClick} />
            <main>
                <div className="page-header">
                    <div>
                        <h1>Analytics Dashboard</h1>
                        <small>Monitor key metrics. Check reporting and reviewinsights
                        </small>
                    </div>

                    <div className='header-actions'>
                        <button>
                            <span className='las la-file-export'></span>
                            Export
                        </button>
                        <button>
                            <span className='las la-tools'></span>
                            Settings
                        </button>
                    </div>
                </div>

                <div className="cards">
                    <div className="card-single">
                        <div className="card-flex">
                            <div className="card-info">
                                <div className="card-head">
                                    <span>Purchases</span>
                                    <small>Number of purchases</small>
                                </div>
                                <h2>17,663</h2>
                                <small>2% less purchase</small>
                            </div>
                            <div className="card-chart danger">
                                <span className="las la-chart-line"></span>
                            </div>
                        </div>
                    </div>

                    <div className="card-single">
                        <div className="card-flex">
                            <div className="card-info">
                                <div className="card-head">
                                    <span>Refunds</span>
                                    <small>Value of refunded orders</small>
                                </div>
                                <h2>$4,523.11</h2>
                                <small>2% less purchase</small>
                            </div>
                            <div className="card-chart success">
                                <span className="las la-chart-line"></span>
                            </div>
                        </div>
                    </div>

                    <div className="card-single">
                        <div className="card-flex">
                            <div className="card-info">
                                <div className="card-head">
                                    <span>Unique Visitors</span>
                                    <small>Number of visitors</small>
                                </div>
                                <h2>46,085</h2>
                                <small>2% less visitors</small>
                            </div>
                            <div className="card-chart yellow">
                                <span className="las la-chart-line"></span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="job-grid">
                    <div className="analytics-card">
                        <div className="analytics-head">
                            <h3>Actions needed</h3>
                            <span className='las la-ellipsis-h'></span>
                        </div>
                        <div className="analytics-chart">
                            <div className="chart-circle">
                                <h1>74%</h1>
                            </div>
                            <div className="analytics-note">
                                <small>Note: Current sprint requires stakeholders meeting to reach conclusion</small>
                            </div>
                        </div>
                        <div className="analytics-btn">
                            <button>Generate report</button>
                        </div>
                    </div>
                    <div className="jobs">
                        <h2>Jobs <small>see all jobs <span className='las la-arrow-right'></span></small></h2>
                        <table style={{width:"100%"}}>
                            <tbody>
                                <tr>
                                    <td><div><span className='indicator'></span></div></td>
                                    <td><div>Customer experience designer</div></td>
                                    <td><div>Design</div></td>
                                    <td><div>Copenhagen Dk.</div></td>
                                    <td><div>Posted 6 days ago</div></td>
                                    <td><div><button>8 applicants</button></div></td>
                                </tr>

                                <tr>
                                    <td><div><span className='indicator even'></span></div></td>
                                    <td><div>Software developer</div></td>
                                    <td><div>Developer</div></td>
                                    <td><div>Copenhagen Dk.</div></td>
                                    <td><div>Posted 6 days ago</div></td>
                                    <td><div><button>3 applicants</button></div></td>
                                </tr>

                                <tr>
                                    <td><div><span className='indicator'></span></div></td>
                                    <td><div>Customer experience designer</div></td>
                                    <td><div>Design</div></td>
                                    <td><div>Copenhagen Dk.</div></td>
                                    <td><div>Posted 6 days ago</div></td>
                                    <td><div><button>8 applicants</button></div></td>
                                </tr>

                                <tr>
                                    <td><div><span className='indicator even'></span></div></td>
                                    <td><div>Software developer</div></td>
                                    <td><div>Developer</div></td>
                                    <td><div>Copenhagen Dk.</div></td>
                                    <td><div>Posted 6 days ago</div></td>
                                    <td><div><button>3 applicants</button></div></td>
                                </tr>

                                <tr>
                                    <td><div><span className='indicator'></span></div></td>
                                    <td><div>Customer experience designer</div></td>
                                    <td><div>Design</div></td>
                                    <td><div>Copenhagen Dk.</div></td>
                                    <td><div>Posted 6 days ago</div></td>
                                    <td><div><button>8 applicants</button></div></td>
                                </tr>

                                <tr>
                                    <td><div><span className='indicator even'></span></div></td>
                                    <td><div>Software developer</div></td>
                                    <td><div>Developer</div></td>
                                    <td><div>Copenhagen Dk.</div></td>
                                    <td><div>Posted 6 days ago</div></td>
                                    <td><div><button>3 applicants</button></div></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdminMain
