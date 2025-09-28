import styles from "./CustomerReviews.module.css";

/**
 * CustomerReviews component for displaying product reviews
 * @param {Array} reviews - Array of review objects
 * @param {string} reviews[].reviewerName - Name of the reviewer
 * @param {number} reviews[].rating - Review rating (1-5)
 * @param {string} reviews[].comment - Review comment
 * @param {string} reviews[].date - Review date
 */
export default function CustomerReviews({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3>Customer Reviews</h3>
      <div className={styles.reviewList}>
        {reviews.slice(0, 3).map((review, index) => (
          <div key={index} className={styles.review}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewerName}>{review.reviewerName}</span>
              <span className={styles.reviewRating}>⭐ {review.rating}</span>
            </div>
            <p className={styles.reviewComment}>{review.comment}</p>
            <div className={styles.reviewDate}>
              {new Date(review.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
