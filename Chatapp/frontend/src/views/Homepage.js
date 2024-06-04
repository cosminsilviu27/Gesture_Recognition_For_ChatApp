import React from 'react';

function Homepage() {
    return (
        <div>
            <main role="main" style={{ marginTop: 50 }}>
                {/* Main section for marketing message or call to action */}
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">Welcome to ChatApp</h1>
                        <p>
                            Engage in conversations, explore new topics, and connect with others using intuitive gesture-based navigation.
                        </p>
                        <p>
                            <a className="btn btn-primary btn-lg" href="/inbox" role="button">
                                Start Chatting »
                            </a>
                        </p>
                    </div>
                </div>

                <div className="container">
                    {/* Example rows of content */}
                    <div className="row">
                        <div className="col-md-4">
                            <h2>Gesture Navigation</h2>
                            <p>
                                Navigate between chats and topics effortlessly with swipe and tap gestures, making communication seamless and intuitive.
                            </p>
                            <p>
                                <a className="btn btn-secondary" href="#" role="button">
                                    Learn More »
                                </a>
                            </p>
                        </div>
                        <div class="col-md-4">
                            <h2>Chat Topics</h2>
                            <p>
                                Explore diverse topics, join discussions, and connect with like-minded individuals. Gesture recognition makes it easier to switch between conversations.
                            </p>
                            <p>
                                <a className="btn btn-secondary" href="#" role="button">
                                    View Details »
                                </a>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h2>Quick Actions</h2>
                            <p>
                                Access quick actions like liking, sharing, and bookmarking conversations with simple gestures, enhancing your chat experience.
                            </p>
                            <p>
                                <a className="btn btn-secondary" href="#" role="button">
                                    View Details »
                                </a>
                            </p>
                        </div>
                    </div>
                    <hr />
                </div>
            </main>

            <footer className="container">
                <p>© ChatApp 2024</p>
            </footer>
        </div>
    )
}

export default Homepage;
