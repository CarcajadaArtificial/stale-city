export default function () {
  return (
    <div attr-a attr-b attr-c attr-d attr-e attr-f>
      <form
        action="https://api.follow.it/subscription-form/null/null"
        method="post"
        class="join mt-1-1"
      >
        <input
          class="join-item input"
          type="email"
          name="email"
          required
          placeholder="your@email.com"
        />
        <button class="join-item btn" type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
}
