import React, { useEffect, useState } from 'react'
import './YoutubeVideos.css'

function YoutubeVideos() {
  const [appleVideos, setAppleVideo] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)

        const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
        const API_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCE_M8A5yxnLfW0KghEeajjw&maxResults=6&order=date&key=${API_KEY}`

        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Check if your API returns data.items or just an array
        // If your API returns { items: [...] } structure:
        const videoData = data.items || data

        // Limit to first 8 videos
        setAppleVideo(videoData.slice(0, 6))

        // Console log to verify 8 videos
        console.log('Fetched videos:', videoData.slice(0, 6))
        console.log('Total videos count:', videoData.slice(0, 6).length)
      } catch (error) {
        console.error('Error fetching videos:', error)
        setError('Failed to fetch YouTube videos. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Format the published date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="youtube-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading videos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="youtube-container">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="youtube-container">
      <h1 className="youtube-main-title">Youtube Videos</h1>
      <div className="youtube-grid">
        {appleVideos.map((video, index) => (
          <div
            key={video.id?.videoId || video.id || index}
            className="youtube-card"
          >
            <div className="video-thumbnail">
              <img
                src={
                  video.snippet?.thumbnails?.high?.url ||
                  video.snippet?.thumbnails?.medium?.url
                }
                alt={video.snippet?.title || 'Video thumbnail'}
                onError={(e) => {
                  e.target.src =
                    'https://via.placeholder.com/480x360?text=Video+Thumbnail'
                }}
              />
              <div className="play-icon">▶</div>
            </div>
            <div className="video-info">
              <h3 className="video-title">
                {video.snippet?.title || 'No title available'}
              </h3>
              <p className="video-description">
                {video.snippet?.description || 'No description available'}
              </p>
              <p className="video-publish-date">
                Published: {formatDate(video.snippet?.publishedAt)}
              </p>
              <p className="video-channel">
                Channel: {video.snippet?.channelTitle || 'Unknown channel'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default YoutubeVideos
