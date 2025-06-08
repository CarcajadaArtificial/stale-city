export default function () {
  return (
    <div attr-a attr-b attr-c attr-d attr-e attr-f>
      <form
        action="https://api.follow.it/subscription-form/bndKZTFxQTkvcFVLLzRvM1BsYmpXNFRkWVoxQXh3RWRLK3lFWkFTZXh5TzJBem50My9mb2JKam0xaUtMaThqZTNjM0RIbWMrZ3NKQXBuTGwwTWJGK3ZFNmRtNGQ0UVd6SVZ3V3BHV0JocmRKSndVOGxIWXJHMFNSd3NTMjE5R0Z8Vk5hRzFwNnBmK1BUUHprT01lWVJZN0hMUlNzNXFjUHdNcmptV0plZTdCOD0=/8"
        method="post"
        class="join mt-1-1"
      >
        <input
          class="join-item input"
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          tabIndex={0}
        />
        <button tabIndex={0} class="join-item btn" type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
}
